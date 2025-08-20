// RUTA COMPLETA: src/app/geo_rutas/geo_rutas.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager, Not } from 'typeorm';
import { GeoRutaEntity, RutaStatus } from './entities/geo_ruta.entity';
import { GeoRecorridoEntity } from '../geo-recorrido/entities/geo-recorrido.entity';
import { GeoUnidadesTransporte } from '../geo_unidades-transporte/entities/geo_unidades-transporte.entity';
import { CreateGeoRutaDto } from './dto/create-geo_ruta.dto';
import { UpdateGeoRutaDto } from './dto/update-geo_ruta.dto';

export interface ClienteGeolocalizado {
  nombreComercio: string;
  direccion: string;
  latitud: string;
  longitud: string;
}

@Injectable()
export class GeoRutasService {
  constructor(
    @InjectRepository(GeoRutaEntity)
    private readonly geoRutaRepository: Repository<GeoRutaEntity>,
    @InjectRepository(GeoRecorridoEntity)
    private readonly recorridoRepository: Repository<GeoRecorridoEntity>,
    @InjectRepository(GeoUnidadesTransporte)
    private readonly unidadRepository: Repository<GeoUnidadesTransporte>, // Mantenemos esta inyección por si se necesita en el futuro
    private readonly entityManager: EntityManager,
  ) {}

  create(createGeoRutaDto: CreateGeoRutaDto): Promise<GeoRutaEntity> {
    const nuevaRuta = this.geoRutaRepository.create(createGeoRutaDto);
    return this.geoRutaRepository.save(nuevaRuta);
  }

  // findAll(): Promise<GeoRutaEntity[]> {
  //   return this.geoRutaRepository.find({
  //     order: { idRuta: 'DESC' },
  //     // Le pedimos a TypeORM que cargue las relaciones.
  //     // Ahora la respuesta JSON incluirá los objetos completos de usuario y unidad.
  //     relations: ['usuario', 'unidadTransporte', 'detalles'], // Aseguramos que cargue todo lo necesario
  //   });
  // }

    findAll(): Promise<GeoRutaEntity[]> {
    return this.geoRutaRepository.find({
      where: {
        statusRuta: Not(RutaStatus.ELIMINADA)
      },
      order: { idRuta: 'DESC' },
      relations: ['usuario', 'unidadTransporte', 'detalles'],
    });
  }

  async findOne(id: number): Promise<GeoRutaEntity> {
    const ruta = await this.geoRutaRepository.findOne({
      where: { idRuta: id },
      relations: ['detalles', 'usuario', 'unidadTransporte'],
    });
    if (!ruta) {
      throw new NotFoundException(
        `La ruta con el ID #${id} no fue encontrada.`,
      );
    }
    return ruta;
  }

  async update(
    id: number,
    updateDto: Partial<UpdateGeoRutaDto & { statusRuta: RutaStatus }>,
  ): Promise<GeoRutaEntity> {
    const rutaActualizada = await this.geoRutaRepository.preload({
      idRuta: id,
      ...updateDto,
    });
    if (!rutaActualizada) {
      throw new NotFoundException(
        `La ruta con el ID #${id} no fue encontrada para actualizar.`,
      );
    }
    return this.geoRutaRepository.save(rutaActualizada);
  }

  
  async remove(id: number): Promise<GeoRutaEntity> {
    const ruta = await this.findOne(id);
    return this.update(id, { statusRuta: RutaStatus.ELIMINADA });
  }

  async obtenerResumenRutas() {
    // Este método usa una consulta SQL manual para obtener un resumen.
    // Aunque findAll con relaciones es más moderno, este método puede ser útil
    // para vistas específicas si se quiere optimizar la carga de datos.
    const query = `
       SELECT
          gr.idRuta,
          gr.idEstatus,
          u.usuario,
          gut.nombreUnidad,
          gr.fecha_hora,
          gr.statusRuta,
          gs.status AS nombreEstatus
        FROM geo_rutas gr 
        LEFT JOIN usuarios u ON u.idUsuario = gr.idUsuario 
        LEFT JOIN geo_unidadTransporte gut ON gut.idUnidadTransporte = gr.idUnidadTransporte
        LEFT JOIN geo_status gs ON gs.idStatus = gr.idEstatus
        ORDER BY gr.idRuta DESC
       `;
    return await this.geoRutaRepository.query(query);
  }

  async findClientesGeolocalizadosParaRuta(
    idRuta: number,
  ): Promise<ClienteGeolocalizado[]> {
    const query = `
      SELECT c.nombreComercio, cd.direccion,
             TRIM(SUBSTRING_INDEX(cd.nombreSucursal, ',', 1)) AS latitud,
             TRIM(SUBSTRING_INDEX(cd.nombreSucursal, ',', -1)) AS longitud
      FROM geo_rutas gr
      JOIN geo_rutasDetalle grd ON gr.idRuta = grd.idRuta
      JOIN servicios_equipos se ON grd.idServicioEquipo = se.idServicioEquipo
      JOIN equipos_cliente ec ON se.idContrato = ec.idEquipoCliente
      JOIN clientes c ON ec.idCliente = c.idcliente
      JOIN cliente_direcciones cd ON c.idcliente = cd.idCliente
      WHERE gr.idRuta = ?
        AND cd.nombreSucursal REGEXP '^-?[0-9]+\\\.?[0-9]*[[:space:]]?,[[:space:]]?-?[0-9]+\\\.?[0-9]*$'
      GROUP BY c.nombreComercio, cd.direccion, latitud, longitud
    `;
    return this.entityManager.query(query, [idRuta]);
  }

  async finalizarYCalcularRuta(idRuta: number): Promise<GeoRutaEntity> {
    const ruta = await this.geoRutaRepository.findOne({
      where: { idRuta },
      relations: ['unidadTransporte'],
    });

    if (!ruta) {
      throw new NotFoundException(
        `La ruta con ID #${idRuta} no fue encontrada.`,
      );
    }

    const puntosRecorrido = await this.recorridoRepository.find({
      where: { idRuta },
      order: { fechaHora: 'ASC' },
    });

    let distanciaTotalKm = 0;
    let consumoEstimadoLitros = 0;
    let duracionMinutos = 0;

    // La lógica de cálculo ahora está protegida dentro de este if.
    if (puntosRecorrido.length > 1) {
      // 1. Calcular distancia
      for (let i = 0; i < puntosRecorrido.length - 1; i++) {
        distanciaTotalKm += this.haversineDistance(
          puntosRecorrido[i],
          puntosRecorrido[i + 1],
        );
      }

      // 2. Calcular duración
      const primerPunto = puntosRecorrido[0];
      const ultimoPunto = puntosRecorrido[puntosRecorrido.length - 1];
      const tiempoInicio = new Date(primerPunto.fechaHora).getTime();
      const tiempoFin = new Date(ultimoPunto.fechaHora).getTime();
      const diffMs = tiempoFin - tiempoInicio;
      duracionMinutos = Math.round(diffMs / 60000);

      // 3. Calcular consumo
      const rendimiento = ruta.unidadTransporte?.rendimientoKmL;
      if (rendimiento && rendimiento > 0 && distanciaTotalKm > 0) {
        consumoEstimadoLitros = distanciaTotalKm / rendimiento;
      }
    }

    // 4. Guardar los resultados (serán 0 si no hubo recorrido)
    ruta.statusRuta = RutaStatus.FINALIZADA;
    ruta.distanciaTotalKm = parseFloat(distanciaTotalKm.toFixed(2));
    ruta.consumoEstimadoLitros = parseFloat(consumoEstimadoLitros.toFixed(2));
    ruta.duracionMinutos = duracionMinutos;

    return this.geoRutaRepository.save(ruta);
  }

  private haversineDistance(
    coords1: { latitud: number; longitud: number },
    coords2: { latitud: number; longitud: number },
  ): number {
    const R = 6371; // Radio de la Tierra en km
    const dLat = this.toRad(coords2.latitud - coords1.latitud);
    const dLon = this.toRad(coords2.longitud - coords1.longitud);
    const lat1 = this.toRad(coords1.latitud);
    const lat2 = this.toRad(coords2.latitud);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(value: number): number {
    return (value * Math.PI) / 180;
  }
}
