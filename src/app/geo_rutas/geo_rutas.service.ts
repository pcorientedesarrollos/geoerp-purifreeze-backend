// src/geo_rutas/geo_rutas.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGeoRutaDto } from './dto/create-geo_ruta.dto';
import { UpdateGeoRutaDto } from './dto/update-geo_ruta.dto';
import { GeoRutaEntity } from './entities/geo_ruta.entity';

@Injectable()
export class GeoRutasService {
  constructor(
    @InjectRepository(GeoRutaEntity)
    private readonly geoRutaRepository: Repository<GeoRutaEntity>,
  ) {}

  async obtenerResumenRutas() {
    // CORREGIDO: Se eliminó la unión con la tabla 'clientes' y el campo 'nombreComercio'
    // ya que 'idCliente' no existe en 'geo_rutas'.
    const query = `
     SELECT 
        gr.idRuta,
        u.usuario,
        gut.nombreUnidad,
        gr.kmlInicial,
        gr.fecha_hora,
        gr.idTipoServicio 
      FROM geo_rutas gr 
      LEFT JOIN usuarios u ON u.idUsuario = gr.idUsuario 
      LEFT JOIN geo_unidadTransporte gut ON gut.idUnidadTransporte = gr.idUnidadTransporte
      ORDER BY idRuta DESC
    `;
    return await this.geoRutaRepository.query(query);
  }

  async create(createGeoRutaDto: CreateGeoRutaDto): Promise<GeoRutaEntity> {
    const nuevaRuta = this.geoRutaRepository.create(createGeoRutaDto);
    return this.geoRutaRepository.save(nuevaRuta);
  }

  findAll(): Promise<GeoRutaEntity[]> {
    return this.geoRutaRepository.find({
      order: { idRuta: 'DESC' }, // Es común ordenar por ID para ver las más recientes
      relations: ['paradas'],
    });
  }

  async findOne(id: number): Promise<GeoRutaEntity> {
    const ruta = await this.geoRutaRepository.findOne({
      where: { idRuta: id },
      relations: ['paradas', 'detalles'], // Carga ambas relaciones
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
    updateGeoRutaDto: UpdateGeoRutaDto,
  ): Promise<GeoRutaEntity> {
    // Asegúrate de que las paradas no se eliminen si no se envían en el DTO de actualización
    const rutaExistente = await this.findOne(id);
    const rutaActualizada = this.geoRutaRepository.merge(
      rutaExistente,
      updateGeoRutaDto,
    );

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
}
