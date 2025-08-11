
// En tu proyecto NestJS: src/app/geo_rutas/geo_rutas.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateGeoRutaDto } from './dto/create-geo_ruta.dto';
import { UpdateGeoRutaDto } from './dto/update-geo_ruta.dto';
import { GeoRutaEntity } from './entities/geo_ruta.entity';

//Interfaz para la ubicacion de cada CLIENTE
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
    private readonly entityManager: EntityManager,
  ) {}

  /**
   * ================================================================
   * MÉTODO CREATE - CORREGIDO PARA LA NUEVA LÓGICA
   * ================================================================
   * Este método ahora es mucho más simple. Solo recibe los datos del encabezado
   * (idUsuario, idUnidadTransporte, kmInicial) desde el DTO, crea la entidad
   * y la guarda. Devuelve la entidad recién creada con el idRuta generado.
   */
  async create(createGeoRutaDto: CreateGeoRutaDto): Promise<GeoRutaEntity> {
    // El DTO ahora solo contiene los datos del encabezado, sin 'paradas'.
    const nuevaRuta = this.geoRutaRepository.create(createGeoRutaDto);
    return this.geoRutaRepository.save(nuevaRuta);
  }

  /**
   * Devuelve todas las rutas maestras, ordenadas por la más reciente.
   * La relación 'detalles' se carga para ver las paradas asociadas.
   */
  findAll(): Promise<GeoRutaEntity[]> {
    return this.geoRutaRepository.find({
      order: { idRuta: 'DESC' },
      relations: ['detalles'], // Cargamos la relación con los detalles
    });
  }

  /**
   * Busca una ruta específica por su ID y carga sus detalles asociados.
   */
  async findOne(id: number): Promise<GeoRutaEntity> {
    const ruta = await this.geoRutaRepository.findOne({
      where: { idRuta: id },
      relations: ['detalles'], // Asegúrate de cargar los detalles
    });
    if (!ruta) {
      throw new NotFoundException(
        `La ruta con el ID #${id} no fue encontrada.`,
      );
    }
    return ruta;
  }

  /**
   * Actualiza los datos del encabezado de una ruta.
   * Este método no modificará los detalles asociados.
   */
  async update(
    id: number,
    updateGeoRutaDto: UpdateGeoRutaDto,
  ): Promise<GeoRutaEntity> {
    // Preload busca la entidad y la fusiona con los nuevos datos del DTO.
    const rutaActualizada = await this.geoRutaRepository.preload({
      idRuta: id,
      ...updateGeoRutaDto,
    });

    if (!rutaActualizada) {
      throw new NotFoundException(
        `La ruta con el ID #${id} no fue encontrada para actualizar.`,
      );
    }

    return this.geoRutaRepository.save(rutaActualizada);
  }

  /**
   * Elimina una ruta. Gracias a 'onDelete: CASCADE' en la entidad GeoRutaDetalle,
   * al eliminar una ruta, todos sus detalles asociados también se eliminarán automáticamente.
   */
  async remove(id: number): Promise<{ message: string }> {
    const result = await this.geoRutaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `La ruta con el ID #${id} no fue encontrada para eliminar.`,
      );
    }
    return { message: `La ruta con el ID #${id} ha sido eliminada.` };
  }

  /**
   * MÉTODO DE RESUMEN OPCIONAL
   * Si necesitas una consulta personalizada para una vista de resumen, puedes mantenerla.
   * He eliminado 'idTipoServicio' ya que no pertenece al encabezado de la ruta.
   */
   async obtenerResumenRutas() {
       const query = `
       select  gr.idRuta ,
          u.usuario , 
          gut.nombreUnidad , 
         
          gr.fecha_hora 
        from geo_rutas gr 
        inner join usuarios u on u.idUsuario = gr.idUsuario 
        inner join geo_unidadTransporte gut on  gut.idUnidadTransporte = gr.idUnidadTransporte 
       `;
        return await this.geoRutaRepository.query(query);
    }
  async findClientesGeolocalizadosParaRuta(
    idRuta: number,
  ): Promise<ClienteGeolocalizado[]> {
    const query = `
      SELECT
          c.nombreComercio,
          cd.direccion,
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
      GROUP BY c.nombreComercio, cd.direccion, latitud, longitud;
    `;
    // Pasamos el idRuta como parámetro a la consulta
    return this.entityManager.query(query, [idRuta]);
  }
}
