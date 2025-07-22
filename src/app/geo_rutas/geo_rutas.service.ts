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

  async create(createGeoRutaDto: CreateGeoRutaDto): Promise<GeoRutaEntity> {
    const nuevaRuta = this.geoRutaRepository.create(createGeoRutaDto);
    return this.geoRutaRepository.save(nuevaRuta);
  }

  findAll(): Promise<GeoRutaEntity[]> {
    return this.geoRutaRepository.find({
      order: { fecha_hora: 'DESC' },
    });
  }

  async findOne(id: number): Promise<GeoRutaEntity> {
    const ruta = await this.geoRutaRepository.findOne({
      where: { idRuta: id },
      relations: ['paradas'], // <-- Carga la relación 'paradas'
    });
    if (!ruta) {
      throw new NotFoundException(
        `La ruta con el ID #${id} no fue encontrada.`,
      );
    }
    return ruta;
  }
  // async findOne(id: number): Promise<GeoRutaEntity> {
  //   const ruta = await this.geoRutaRepository.findOneBy({ idRuta: id });
  //   if (!ruta) {
  //     throw new NotFoundException(`La ruta con el ID #${id} no fue encontrada.`);
  //   }
  //   return ruta;
  // }

  async update(
    id: number,
    updateGeoRutaDto: UpdateGeoRutaDto,
  ): Promise<GeoRutaEntity> {
    const ruta = await this.geoRutaRepository.preload({
      idRuta: id,
      ...updateGeoRutaDto,
    });

    if (!ruta) {
      throw new NotFoundException(
        `La ruta con el ID #${id} no fue encontrada para actualizar.`,
      );
    }

    return this.geoRutaRepository.save(ruta);
  }

  async remove(id: number): Promise<{ message: string }> {
    const rutaAEliminar = await this.findOne(id); // Reutilizamos findOne para verificar que existe
    await this.geoRutaRepository.remove(rutaAEliminar);
    return { message: `La ruta con el ID #${id} ha sido eliminada.` };
  }
}
