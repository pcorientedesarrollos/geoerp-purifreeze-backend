import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GeoRutaDetalleEntity } from './entities/geo_rutas-detalle.entity';
import { CreateGeoRutaDetalleDto } from './dto/create-geo_rutas-detalle.dto';
import { UpdateGeoRutaDetalleDto } from './dto/update-geo_rutas-detalle.dto';

@Injectable()
export class GeoRutasDetalleService {
  constructor(
    @InjectRepository(GeoRutaDetalleEntity)
    private readonly detalleRepository: Repository<GeoRutaDetalleEntity>,
  ) {}

  create(createDto: CreateGeoRutaDetalleDto): Promise<GeoRutaDetalleEntity> {
    const nuevoDetalle = this.detalleRepository.create(createDto);
    return this.detalleRepository.save(nuevoDetalle);
  }

  findAll(): Promise<GeoRutaDetalleEntity[]> {
    return this.detalleRepository.find();
  }

  async findOne(id: number): Promise<GeoRutaDetalleEntity> {
    const detalle = await this.detalleRepository.findOneBy({ idRutaDetalle: id });
    if (!detalle) {
      throw new NotFoundException(`El detalle de ruta con ID #${id} no fue encontrado.`);
    }
    return detalle;
  }

  async update(id: number, updateDto: UpdateGeoRutaDetalleDto): Promise<GeoRutaDetalleEntity> {
    const detalle = await this.detalleRepository.preload({
      idRutaDetalle: id,
      ...updateDto,
    });
    if (!detalle) {
      throw new NotFoundException(`El detalle de ruta con ID #${id} no fue encontrado.`);
    }
    return this.detalleRepository.save(detalle);
  }

  async remove(id: number): Promise<{ message: string }> {
    const detalle = await this.findOne(id);
    await this.detalleRepository.remove(detalle);
    return { message: `El detalle de ruta con ID #${id} ha sido eliminado.` };
  }
}