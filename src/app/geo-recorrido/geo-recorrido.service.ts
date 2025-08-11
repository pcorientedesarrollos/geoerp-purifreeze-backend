import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GeoRecorridoEntity } from './entities/geo-recorrido.entity';
import { CreateGeoRecorridoDto } from './dto/create-geo-recorrido.dto';
import { UpdateGeoRecorridoDto } from './dto/update-geo-recorrido.dto';

@Injectable()
export class GeoRecorridoService {
  constructor(
    @InjectRepository(GeoRecorridoEntity)
    private readonly recorridoRepository: Repository<GeoRecorridoEntity>,
  ) {}

  create(createDto: CreateGeoRecorridoDto): Promise<GeoRecorridoEntity> {
    const nuevoRecorrido = this.recorridoRepository.create(createDto);
    return this.recorridoRepository.save(nuevoRecorrido);
  }

  async obtenerrecorrido(idRuta: number) {
      const query = `
                  SELECT latitud,longitud
                  FROM geo_recorrido
                  WHERE idRuta =?
          `;  
      return await this.recorridoRepository.query(query, [idRuta]);
    }

  findAll(): Promise<GeoRecorridoEntity[]> {
    return this.recorridoRepository.find({
      order: { fechaHora: 'DESC' },
      relations: ['rutaDetalle'], // CORREGIDO (Debe usar el nombre de la propiedad de la entidad)
    });
  }

  async findOne(id: number): Promise<GeoRecorridoEntity> {
    const recorrido = await this.recorridoRepository.findOne({
      where: { idRecorrido: id },
      relations: ['rutaDetalle'],
    });
    if (!recorrido) {
      throw new NotFoundException(
        `El recorrido con ID #${id} no fue encontrado.`,
      );
    }
    return recorrido;
  }

  async update(
    id: number,
    updateDto: UpdateGeoRecorridoDto,
  ): Promise<GeoRecorridoEntity> {
    const recorrido = await this.recorridoRepository.preload({
      idRecorrido: id,
      ...updateDto,
    });
    if (!recorrido) {
      throw new NotFoundException(
        `El recorrido con ID #${id} no fue encontrado para actualizar.`,
      );
    }
    return this.recorridoRepository.save(recorrido);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.recorridoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `El recorrido con ID #${id} no fue encontrado para eliminar.`,
      );
    }
    return { message: `El recorrido con ID #${id} ha sido eliminado.` };
  }
}
