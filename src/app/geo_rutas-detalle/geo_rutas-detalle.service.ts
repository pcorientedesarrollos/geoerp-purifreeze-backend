
// src/app/geo-rutas-detalle/geo-rutas-detalle.service.ts (en NestJS)

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { GeoRutaDetalleEntity } from './entities/geo_rutas-detalle.entity';
import { CreateGeoRutaDetalleDto } from './dto/create-geo_rutas-detalle.dto';
import { UpdateGeoRutaDetalleDto } from './dto/update-geo_rutas-detalle.dto';

@Injectable()
export class GeoRutasDetalleService {
  constructor(
    @InjectRepository(GeoRutaDetalleEntity)
    private readonly detalleRepository: Repository<GeoRutaDetalleEntity>,
    private readonly entityManager: EntityManager,
  ) {}

  create(createDto: CreateGeoRutaDetalleDto): Promise<GeoRutaDetalleEntity> {
    const nuevoDetalle = this.detalleRepository.create(createDto);
    return this.detalleRepository.save(nuevoDetalle);
  }

  async findServiciosDisponiblesParaRuta(): Promise<any[]> {
    const [results] = await this.entityManager.query('CALL sp_FindAvailableServices()');
    
    return results || [];
  }



   async obtenerCoordenadas(idRuta: number) {
      const query = `
       SELECT
          grd.idRutaDetalle,
          c.nombreComercio,
          cd.direccion,
          gs.status AS estatus,
          grd.status,
          grd.tipoServicio,
          TRIM(SUBSTRING_INDEX(cd.nombreSucursal, ',', 1)) AS latitud,
          TRIM(SUBSTRING_INDEX(cd.nombreSucursal, ',', -1)) AS longitud
      FROM geo_rutas gr
      JOIN geo_rutasDetalle grd ON gr.idRuta = grd.idRuta
      JOIN servicios_equipos se ON grd.idServicioEquipo = se.idServicioEquipo
      JOIN equipos_cliente ec ON se.idContrato = ec.idEquipoCliente
      JOIN clientes c ON ec.idCliente = c.idcliente
      JOIN cliente_direcciones cd ON c.idcliente = cd.idCliente
      JOIN geo_status gs ON grd.status = gs.idStatus
      WHERE gr.idRuta = ?
        AND cd.nombreSucursal REGEXP '^-?[0-9]+\\\.?[0-9]*[[:space:]]?,[[:space:]]?-?[0-9]+\\\.?[0-9]*$'
      GROUP BY c.nombreComercio, cd.direccion, latitud, longitud`;  
      return await this.detalleRepository.query(query, [idRuta]);
    }

  findAll(): Promise<GeoRutaDetalleEntity[]> {
    return this.detalleRepository.find({ relations: ['ruta'] });
  }

  async findOne(idRutaDetalle: number): Promise<GeoRutaDetalleEntity> {
    const detalle = await this.detalleRepository.findOne({
      where: { idRutaDetalle },
      relations: ['ruta', 'recorridos'],
    });
    if (!detalle) {
      throw new NotFoundException(`El detalle de ruta con ID #${idRutaDetalle} no fue encontrado.`);
    }
    return detalle;
  }

  async update(idRutaDetalle: number, updateDto: UpdateGeoRutaDetalleDto): Promise<GeoRutaDetalleEntity> {
    const detalle = await this.detalleRepository.preload({
      idRutaDetalle,
      ...updateDto,
    });
    if (!detalle) {
      throw new NotFoundException(`El detalle de ruta con ID #${idRutaDetalle} no fue encontrado.`);
    }
    return this.detalleRepository.save(detalle);
  }

  async remove(idRutaDetalle: number): Promise<GeoRutaDetalleEntity> {
    const detalle = await this.findOne(idRutaDetalle);
    detalle.status = 5; // Asigna el ID del estado "Eliminado"
    return this.detalleRepository.save(detalle);
  }

  async guardarCoordenada(dto: CreateGeoRutaDetalleDto): Promise<GeoRutaDetalleEntity> {
    const nuevo = this.detalleRepository.create(dto);
    return this.detalleRepository.save(nuevo);
  }
}