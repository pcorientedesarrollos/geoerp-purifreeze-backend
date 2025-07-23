import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGeoRutasParadaDto } from './dto/create-geo-rutas-parada.dto';
import { UpdateGeoRutasParadaDto } from './dto/update-geo-rutas-parada.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GeoRutasParadaEntity } from './entities/geo-rutas-parada.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GeoRutasParadasService {


  constructor(
    @InjectRepository(GeoRutasParadaEntity)
    private readonly detalleRepository: Repository<GeoRutasParadaEntity>,
  ) {}

  create(createDto: CreateGeoRutasParadaDto): Promise<GeoRutasParadaEntity> {
    const nuevoDetalle = this.detalleRepository.create(createDto);
    return this.detalleRepository.save(nuevoDetalle);
  }

  findAll(): Promise<GeoRutasParadaEntity[]> {
    return this.detalleRepository.find();
  }

  async findOne(id: number): Promise<GeoRutasParadaEntity> {
    const detalle = await this.detalleRepository.findOneBy({ idParada: id });
    if (!detalle) {
      throw new NotFoundException(`El detalle de ruta con ID #${id} no fue encontrado.`);
    }
    return detalle;
  }

  async update(id: number, updateDto: UpdateGeoRutasParadaDto): Promise<GeoRutasParadaEntity> {
    const detalle = await this.detalleRepository.preload({
      idParada: id,
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
