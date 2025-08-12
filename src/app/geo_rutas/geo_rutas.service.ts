// // RUTA COMPLETA: src/app/geo_rutas/geo_rutas.service.ts

// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository, EntityManager } from 'typeorm';
// import { GeoRutaEntity, RutaStatus } from './entities/geo_ruta.entity';
// import { GeoRecorridoEntity } from '../geo-recorrido/entities/geo-recorrido.entity';
// import { GeoUnidadesTransporte } from '../geo_unidades-transporte/entities/geo_unidades-transporte.entity';
// import { CreateGeoRutaDto } from './dto/create-geo_ruta.dto';
// import { UpdateGeoRutaDto } from './dto/update-geo_ruta.dto';

// export interface ClienteGeolocalizado {
//   nombreComercio: string;
//   direccion: string;
//   latitud: string;
//   longitud: string;
// }

// @Injectable()
// export class GeoRutasService {
//   constructor(
//     @InjectRepository(GeoRutaEntity)
//     private readonly geoRutaRepository: Repository<GeoRutaEntity>,
//     @InjectRepository(GeoRecorridoEntity)
//     private readonly recorridoRepository: Repository<GeoRecorridoEntity>,
//     @InjectRepository(GeoUnidadesTransporte)
//     private readonly unidadRepository: Repository<GeoUnidadesTransporte>,
//     private readonly entityManager: EntityManager,
//   ) {}

//   create(createGeoRutaDto: CreateGeoRutaDto): Promise<GeoRutaEntity> {
//     const nuevaRuta = this.geoRutaRepository.create(createGeoRutaDto);
//     return this.geoRutaRepository.save(nuevaRuta);
//   }

//   findAll(): Promise<GeoRutaEntity[]> {
//     return this.geoRutaRepository.find({
//       order: { idRuta: 'DESC' },
//       relations: ['detalles'],
//     });
//   }

//   async findOne(id: number): Promise<GeoRutaEntity> {
//     const ruta = await this.geoRutaRepository.findOne({
//       where: { idRuta: id },
//       relations: ['detalles'],
//     });
//     if (!ruta) {
//       throw new NotFoundException(
//         `La ruta con el ID #${id} no fue encontrada.`,
//       );
//     }
//     return ruta;
//   }

//   async update(
//     id: number,
//     updateDto: Partial<UpdateGeoRutaDto & { statusRuta: RutaStatus }>,
//   ): Promise<GeoRutaEntity> {
//     const rutaActualizada = await this.geoRutaRepository.preload({
//       idRuta: id,
//       ...updateDto,
//     });
//     if (!rutaActualizada) {
//       throw new NotFoundException(
//         `La ruta con el ID #${id} no fue encontrada para actualizar.`,
//       );
//     }
//     return this.geoRutaRepository.save(rutaActualizada);
//   }

//   async remove(id: number): Promise<{ message: string }> {
//     const result = await this.geoRutaRepository.delete(id);
//     if (result.affected === 0) {
//       throw new NotFoundException(
//         `La ruta con el ID #${id} no fue encontrada para eliminar.`,
//       );
//     }
//     return { message: `La ruta con el ID #${id} ha sido eliminada.` };
//   }

//   /**
//    * MÉTODO DE RESUMEN OPCIONAL
//    * Si necesitas una consulta personalizada para una vista de resumen, puedes mantenerla.
//    * He eliminado 'idTipoServicio' ya que no pertenece al encabezado de la ruta.
//    */
//    async obtenerResumenRutas() {
//        const query = `
//        select  gr.idRuta ,
//           u.usuario , 
//           gut.nombreUnidad , 
         
//           gr.fecha_hora 
//         from geo_rutas gr 
//         inner join usuarios u on u.idUsuario = gr.idUsuario 
//         inner join geo_unidadTransporte gut on  gut.idUnidadTransporte = gr.idUnidadTransporte 
//        `;
//         return await this.geoRutaRepository.query(query);
//     }
//   async findClientesGeolocalizadosParaRuta(
//     idRuta: number,
//   ): Promise<ClienteGeolocalizado[]> {
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

//   async finalizarYCalcularRuta(idRuta: number): Promise<GeoRutaEntity> {
//     const ruta = await this.geoRutaRepository.findOne({
//       where: { idRuta },
//       relations: ['unidadTransporte'],
//     });

//     if (!ruta) {
//       throw new NotFoundException(
//         `La ruta con ID #${idRuta} no fue encontrada.`,
//       );
//     }

//     const puntosRecorrido = await this.recorridoRepository.find({
//       where: { idRuta },
//       order: { fechaHora: 'ASC' },
//     });

//     let distanciaTotalKm = 0;
//     let consumoEstimadoLitros = 0;

//     if (puntosRecorrido.length > 1) {
//       for (let i = 0; i < puntosRecorrido.length - 1; i++) {
//         distanciaTotalKm += this.haversineDistance(
//           puntosRecorrido[i],
//           puntosRecorrido[i + 1],
//         );
//       }
//     }

//     const rendimiento = ruta.unidadTransporte?.rendimientoKmL;
//     if (rendimiento && rendimiento > 0 && distanciaTotalKm > 0) {
//       consumoEstimadoLitros = distanciaTotalKm / rendimiento;
//     }

//     ruta.statusRuta = RutaStatus.FINALIZADA;
//     ruta.distanciaTotalKm = parseFloat(distanciaTotalKm.toFixed(2));
//     ruta.consumoEstimadoLitros = parseFloat(consumoEstimadoLitros.toFixed(2));

//     return this.geoRutaRepository.save(ruta);
//   }

//   private haversineDistance(
//     coords1: { latitud: number; longitud: number },
//     coords2: { latitud: number; longitud: number },
//   ): number {
//     const R = 6371; // Radio de la Tierra en km
//     const dLat = this.toRad(coords2.latitud - coords1.latitud);
//     const dLon = this.toRad(coords2.longitud - coords1.longitud);
//     const lat1 = this.toRad(coords1.latitud);
//     const lat2 = this.toRad(coords2.latitud);

//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c;
//   }

//   private toRad(value: number): number {
//     return (value * Math.PI) / 180;
//   }
// }


// RUTA COMPLETA: src/app/geo_rutas/geo_rutas.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
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
    private readonly unidadRepository: Repository<GeoUnidadesTransporte>,
    private readonly entityManager: EntityManager,
  ) {}

  create(createGeoRutaDto: CreateGeoRutaDto): Promise<GeoRutaEntity> {
    const nuevaRuta = this.geoRutaRepository.create(createGeoRutaDto);
    return this.geoRutaRepository.save(nuevaRuta);
  }

  findAll(): Promise<GeoRutaEntity[]> {
    return this.geoRutaRepository.find({
      order: { idRuta: 'DESC' },
      relations: ['detalles'],
    });
  }

  async findOne(id: number): Promise<GeoRutaEntity> {
    const ruta = await this.geoRutaRepository.findOne({
      where: { idRuta: id },
      relations: ['detalles'],
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

    if (puntosRecorrido.length > 1) {
      for (let i = 0; i < puntosRecorrido.length - 1; i++) {
        distanciaTotalKm += this.haversineDistance(
          puntosRecorrido[i],
          puntosRecorrido[i + 1],
        );
      }
    }

    const rendimiento = ruta.unidadTransporte?.rendimientoKmL;
    if (rendimiento && rendimiento > 0 && distanciaTotalKm > 0) {
      consumoEstimadoLitros = distanciaTotalKm / rendimiento;
    }

    ruta.statusRuta = RutaStatus.FINALIZADA;
    ruta.distanciaTotalKm = parseFloat(distanciaTotalKm.toFixed(2));
    ruta.consumoEstimadoLitros = parseFloat(consumoEstimadoLitros.toFixed(2));

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
