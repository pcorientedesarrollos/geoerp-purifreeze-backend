
// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository, EntityManager, Not } from 'typeorm';
// import { GeoRutaEntity } from './entities/geo_ruta.entity';
// import { GeoRecorridoEntity } from '../geo-recorrido/entities/geo-recorrido.entity';
// import { CreateGeoRutaDto } from './dto/create-geo_ruta.dto';
// import { UpdateGeoRutaDto } from './dto/update-geo_ruta.dto';

// // ===================== ¡AQUÍ ESTÁ LA CORRECCIÓN! =====================
// // Se elimina la importación incorrecta y se define la interfaz aquí mismo.
// export interface ClienteGeolocalizado {
//   nombreComercio: string;
//   direccion: string;
//   latitud: string;
//   longitud: string;
// }
// // ====================================================================

// @Injectable()
// export class GeoRutasService {
//   private readonly ESTATUS_ELIMINADA = 5;
//   private readonly ESTATUS_FINALIZADA = 4;
//   private readonly ESTATUS_EN_CURSO = 2;

//   constructor(
//     @InjectRepository(GeoRutaEntity)
//     private readonly geoRutaRepository: Repository<GeoRutaEntity>,
//     @InjectRepository(GeoRecorridoEntity)
//     private readonly recorridoRepository: Repository<GeoRecorridoEntity>,
//     private readonly entityManager: EntityManager,
//   ) {}

//   async findAll(): Promise<GeoRutaEntity[]> {
//     return this.geoRutaRepository.createQueryBuilder('ruta')
//       .leftJoinAndSelect('ruta.usuario', 'usuario')
//       .leftJoinAndSelect('ruta.unidadTransporte', 'unidadTransporte')
//       .leftJoinAndSelect('ruta.status', 'status')
//       .leftJoinAndSelect('ruta.detalles', 'detalles')
//       .where('ruta.idEstatus != :estatusEliminada', { estatusEliminada: this.ESTATUS_ELIMINADA })
//       .orderBy('ruta.idRuta', 'DESC')
//       .getMany();
//   }

//   create(createGeoRutaDto: CreateGeoRutaDto): Promise<GeoRutaEntity> {
//     const nuevaRuta = this.geoRutaRepository.create(createGeoRutaDto);
//     return this.geoRutaRepository.save(nuevaRuta);
//   }

//   async findOne(id: number): Promise<GeoRutaEntity> {
//     const ruta = await this.geoRutaRepository.findOne({
//       where: { idRuta: id },
//       relations: ['usuario', 'unidadTransporte', 'status', 'detalles'],
//     });
//     if (!ruta) {
//       throw new NotFoundException(`La ruta con el ID #${id} no fue encontrada.`);
//     }
//     return ruta;
//   }

//   async update(id: number, updateDto: UpdateGeoRutaDto): Promise<GeoRutaEntity> {
//     const rutaActualizada = await this.geoRutaRepository.preload({
//       idRuta: id,
//       ...updateDto,
//     });
//     if (!rutaActualizada) {
//       throw new NotFoundException(`La ruta con el ID #${id} no fue encontrada para actualizar.`);
//     }
//     return this.geoRutaRepository.save(rutaActualizada);
//   }

//   async remove(id: number): Promise<GeoRutaEntity> {
//     const ruta = await this.findOne(id);
//     ruta.idEstatus = this.ESTATUS_ELIMINADA;
//     return this.geoRutaRepository.save(ruta);
//   }

//   async iniciarRuta(id: number): Promise<GeoRutaEntity> {
//     return this.update(id, { idEstatus: this.ESTATUS_EN_CURSO });
//   }

//   async finalizarYCalcularRuta(idRuta: number): Promise<GeoRutaEntity> {
//     const ruta = await this.geoRutaRepository.findOne({
//       where: { idRuta: idRuta },
//       relations: ['unidadTransporte'],
//     });

//     if (!ruta) {
//       throw new NotFoundException(`La ruta con ID #${idRuta} no fue encontrada.`);
//     }

//     const puntosRecorrido = await this.recorridoRepository.find({
//       where: { idRuta: idRuta },
//       order: { fechaHora: 'ASC' },
//     });

//     let distanciaTotalKm = 0;
//     let consumoEstimadoLitros = 0;
//     let duracionMinutos = 0;

//     if (puntosRecorrido.length > 1) {
//       for (let i = 0; i < puntosRecorrido.length - 1; i++) {
//         distanciaTotalKm += this.haversineDistance(puntosRecorrido[i], puntosRecorrido[i + 1]);
//       }
//       const primerPunto = puntosRecorrido[0];
//       const ultimoPunto = puntosRecorrido[puntosRecorrido.length - 1];
//       duracionMinutos = Math.round((new Date(ultimoPunto.fechaHora).getTime() - new Date(primerPunto.fechaHora).getTime()) / 60000);
//       const rendimiento = ruta.unidadTransporte?.rendimientoKmL;
//       if (rendimiento && rendimiento > 0) {
//         consumoEstimadoLitros = distanciaTotalKm / rendimiento;
//       }
//     }

//     ruta.idEstatus = this.ESTATUS_FINALIZADA;
//     ruta.distanciaTotalKm = parseFloat(distanciaTotalKm.toFixed(2));
//     ruta.consumoEstimadoLitros = parseFloat(consumoEstimadoLitros.toFixed(2));
//     ruta.duracionMinutos = duracionMinutos;

//     return this.geoRutaRepository.save(ruta);
//   }

//   async findClientesGeolocalizadosParaRuta(idRuta: number): Promise<ClienteGeolocalizado[]> {
//     const query = `
//       SELECT c.nombreComercio, cd.direccion,
//              TRIM(SUBSTRING_INDEX(cd.nombreSucursal, ',', 1)) AS latitud,
//              TRIM(SUBSTRING_INDEX(cd.nombreSucursal, ',', -1)) AS longitud
//       FROM geo_rutas gr
//       JOIN geo_rutasDetalle grd ON gr.idRuta = grd.idRuta
//       JOIN servicios_equipos se ON grd.idServicioEquipo = se.idServicioEquipo
//       JOIN equipos_cliente ec ON se.idContrato = ec.idEquipoCliente
//       JOIN clientes c ON ec.idCliente = c.idcliente
//       JOIN cliente_direcciones cd ON c.idcliente = cd.idCliente
//       WHERE gr.idRuta = ?
//         AND cd.nombreSucursal REGEXP '^-?[0-9]+\\\.?[0-9]*[[:space:]]?,[[:space:]]?-?[0-9]+\\\.?[0-9]*$'
//       GROUP BY c.nombreComercio, cd.direccion, latitud, longitud
//     `;
//     return this.entityManager.query(query, [idRuta]);
//   }

//     async obtenerResumenRutas() {
//     const query = `
//        SELECT
//           gr.idRuta,
//           gr.idEstatus,
//           u.usuario,
//           gut.nombreUnidad,
//           gr.fecha_hora,
//           gs.status AS nombreEstatus
//         FROM geo_rutas gr
//         LEFT JOIN usuarios u ON u.idUsuario = gr.idUsuario
//         LEFT JOIN geo_unidadTransporte gut ON gut.idUnidadTransporte = gr.idUnidadTransporte
//         LEFT JOIN geo_status gs ON gs.idStatus = gr.idEstatus
//         WHERE gr.idEstatus != ?
//         ORDER BY gr.idRuta DESC
//        `;
//     return await this.geoRutaRepository.query(query, [this.ESTATUS_ELIMINADA]);
//   }

//   private haversineDistance(coords1: { latitud: number; longitud: number }, coords2: { latitud: number; longitud: number }): number {
//     const R = 6371; const dLat = this.toRad(coords2.latitud - coords1.latitud); const dLon = this.toRad(coords2.longitud - coords1.longitud);
//     const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(this.toRad(coords1.latitud)) * Math.cos(this.toRad(coords2.latitud)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
//   }

//   private toRad(value: number): number { return (value * Math.PI) / 180; }
// }

// COPIA Y PEGA ESTE CONTENIDO COMPLETO

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager, Not } from 'typeorm';
import { GeoRutaEntity } from './entities/geo_ruta.entity';
import { GeoRecorridoEntity } from '../geo-recorrido/entities/geo-recorrido.entity';
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
  private readonly ESTATUS_ELIMINADA = 5;
  private readonly ESTATUS_FINALIZADA = 4;
  private readonly ESTATUS_EN_CURSO = 2;

  constructor(
    @InjectRepository(GeoRutaEntity)
    private readonly geoRutaRepository: Repository<GeoRutaEntity>,
    @InjectRepository(GeoRecorridoEntity)
    private readonly recorridoRepository: Repository<GeoRecorridoEntity>,
    private readonly entityManager: EntityManager,
  ) {}

  /**
   * Encuentra todas las rutas que no estén marcadas como eliminadas.
   * Utiliza QueryBuilder para asegurar que todas las relaciones se carguen correctamente.
   */
  async findAll(): Promise<GeoRutaEntity[]> {
    return this.geoRutaRepository.createQueryBuilder('ruta')
      .leftJoinAndSelect('ruta.usuario', 'usuario')
      .leftJoinAndSelect('ruta.unidadTransporte', 'unidadTransporte')
      .leftJoinAndSelect('ruta.status', 'status')
      // ===================== ¡AQUÍ ESTÁ LA CORRECCIÓN! =====================
      // Volvemos a añadir la unión con la tabla de detalles para que
      // la lista principal incluya la información de los clientes.
      .leftJoinAndSelect('ruta.detalles', 'detalles')
      // ====================================================================
      .where('ruta.idEstatus != :estatusEliminada', { estatusEliminada: this.ESTATUS_ELIMINADA })
      .orderBy('ruta.idRuta', 'DESC')
      .getMany();
  }

  create(createGeoRutaDto: CreateGeoRutaDto): Promise<GeoRutaEntity> {
    const nuevaRuta = this.geoRutaRepository.create(createGeoRutaDto);
    return this.geoRutaRepository.save(nuevaRuta);
  }

  async findOne(id: number): Promise<GeoRutaEntity> {
    const ruta = await this.geoRutaRepository.findOne({
      where: { idRuta: id },
      relations: ['usuario', 'unidadTransporte', 'status', 'detalles'],
    });
    if (!ruta) {
      throw new NotFoundException(`La ruta con el ID #${id} no fue encontrada.`);
    }
    return ruta;
  }

  async update(id: number, updateDto: UpdateGeoRutaDto): Promise<GeoRutaEntity> {
    const rutaActualizada = await this.geoRutaRepository.preload({
      idRuta: id,
      ...updateDto,
    });
    if (!rutaActualizada) {
      throw new NotFoundException(`La ruta con el ID #${id} no fue encontrada para actualizar.`);
    }
    return this.geoRutaRepository.save(rutaActualizada);
  }

  async remove(id: number): Promise<GeoRutaEntity> {
    const ruta = await this.findOne(id);
    ruta.idEstatus = this.ESTATUS_ELIMINADA;
    return this.geoRutaRepository.save(ruta);
  }

  async iniciarRuta(id: number): Promise<GeoRutaEntity> {
    return this.update(id, { idEstatus: this.ESTATUS_EN_CURSO });
  }

  async finalizarYCalcularRuta(idRuta: number): Promise<GeoRutaEntity> {
    const ruta = await this.geoRutaRepository.findOne({
      where: { idRuta: idRuta },
      relations: ['unidadTransporte'],
    });

    if (!ruta) {
      throw new NotFoundException(`La ruta con ID #${idRuta} no fue encontrada.`);
    }

    const puntosRecorrido = await this.recorridoRepository.find({
      where: { idRuta: idRuta },
      order: { fechaHora: 'ASC' },
    });

    let distanciaTotalKm = 0;
    let consumoEstimadoLitros = 0;
    let duracionMinutos = 0;

    if (puntosRecorrido.length > 1) {
      for (let i = 0; i < puntosRecorrido.length - 1; i++) {
        distanciaTotalKm += this.haversineDistance(puntosRecorrido[i], puntosRecorrido[i + 1]);
      }
      const primerPunto = puntosRecorrido[0];
      const ultimoPunto = puntosRecorrido[puntosRecorrido.length - 1];
      duracionMinutos = Math.round((new Date(ultimoPunto.fechaHora).getTime() - new Date(primerPunto.fechaHora).getTime()) / 60000);
      const rendimiento = ruta.unidadTransporte?.rendimientoKmL;
      if (rendimiento && rendimiento > 0) {
        consumoEstimadoLitros = distanciaTotalKm / rendimiento;
      }
    }

    ruta.idEstatus = this.ESTATUS_FINALIZADA;
    ruta.distanciaTotalKm = parseFloat(distanciaTotalKm.toFixed(2));
    ruta.consumoEstimadoLitros = parseFloat(consumoEstimadoLitros.toFixed(2));
    ruta.duracionMinutos = duracionMinutos;

    return this.geoRutaRepository.save(ruta);
  }

  async findClientesGeolocalizadosParaRuta(idRuta: number): Promise<ClienteGeolocalizado[]> {
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


    async obtenerResumenRutas() {
    const query = `
       SELECT
          gr.idRuta,
          gr.idEstatus,
          u.usuario,
          gut.nombreUnidad,
          gr.fecha_hora,
          gs.status AS nombreEstatus
        FROM geo_rutas gr
        LEFT JOIN usuarios u ON u.idUsuario = gr.idUsuario
        LEFT JOIN geo_unidadTransporte gut ON gut.idUnidadTransporte = gr.idUnidadTransporte
        LEFT JOIN geo_status gs ON gs.idStatus = gr.idEstatus
        WHERE gr.idEstatus != ?
        ORDER BY gr.idRuta DESC
       `;
    return await this.geoRutaRepository.query(query, [this.ESTATUS_ELIMINADA]);
  }




  private haversineDistance(coords1: { latitud: number; longitud: number }, coords2: { latitud: number; longitud: number }): number {
    const R = 6371; const dLat = this.toRad(coords2.latitud - coords1.latitud); const dLon = this.toRad(coords2.longitud - coords1.longitud);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(this.toRad(coords1.latitud)) * Math.cos(this.toRad(coords2.latitud)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  }

  private toRad(value: number): number { return (value * Math.PI) / 180; }
}