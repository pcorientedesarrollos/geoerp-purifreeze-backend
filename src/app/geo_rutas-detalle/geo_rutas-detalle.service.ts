// src/app/geo-rutas-detalle/geo-rutas-detalle.service.ts

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
    const rawQuery = `
      SELECT 
          sq.idServicioEquipo, 
          es.NoSerie,
          es.nombreEquipo, 
          sq.fechaServicio, 
          sq.hora,
          sq.tipo_servicio, 
          sq.descripcion, 
          sq.observaciones_servicio,  
          sq.idContrato, 
          cl.nombreComercio
      FROM 
          servicios_equipos sq 
      LEFT JOIN 
          equipos_serie es ON sq.idEquipoCliente = es.idEquipoSerie
      LEFT JOIN 
          equipos_cliente ec ON sq.idContrato = ec.idEquipoCliente
      LEFT JOIN 
          clientes cl ON ec.idCliente = cl.idcliente
      WHERE 
          sq.status = 'CONFIRMADO';
    `;
    return this.entityManager.query(rawQuery);
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
      throw new NotFoundException(
        `El detalle de ruta con ID #${idRutaDetalle} no fue encontrado.`,
      );
    }
    return detalle;
  }

  async update(
    idRutaDetalle: number,
    updateDto: UpdateGeoRutaDetalleDto,
  ): Promise<GeoRutaDetalleEntity> {
    const detalle = await this.detalleRepository.preload({
      idRutaDetalle,
      ...updateDto,
    });

    if (!detalle) {
      throw new NotFoundException(
        `El detalle de ruta con ID #${idRutaDetalle} no fue encontrado.`,
      );
    }
    return this.detalleRepository.save(detalle);
  }

  async remove(idRutaDetalle: number): Promise<{ message: string }> {
    const detalle = await this.findOne(idRutaDetalle);
    await this.detalleRepository.remove(detalle);
    return {
      message: `El detalle de ruta con ID #${idRutaDetalle} ha sido eliminado.`,
    };
  }

  async guardarCoordenada(
    dto: CreateGeoRutaDetalleDto,
  ): Promise<GeoRutaDetalleEntity> {
    const nuevo = this.detalleRepository.create(dto);
    return this.detalleRepository.save(nuevo);
  }
}
