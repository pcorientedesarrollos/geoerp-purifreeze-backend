// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

// import { CreateGeoUnidadesTransporteDto } from './dto/create-geo_unidades-transporte.dto';
// import { GeoUnidadesTransporte } from './entities/geo_unidades-transporte.entity';
// import { UpdateGeoUnidadesTransporteDto } from './dto/update-geo_unidades-transporte.dto';

// @Injectable()
// export class GeoUnidadesTransporteService {
//   constructor(
//     @InjectRepository(GeoUnidadesTransporte)
//     private readonly repo: Repository<GeoUnidadesTransporte>,
//   ) {}

//   create(dto: CreateGeoUnidadesTransporteDto) {
//     const unidad = this.repo.create(dto);
//     return this.repo.save(unidad);
//   }

//   findAll() {
//     return this.repo.find({ relations: ['tipoUnidad'] });
//   }

//   findOne(id: number) {
//     return this.repo.findOne({
//       where: { idUnidadTransporte: id },
//       relations: ['tipoUnidad'],
//     });
//   }

//   update(id: number, dto: UpdateGeoUnidadesTransporteDto) {
//     return this.repo.update(id, dto);
//   }

//   remove(id: number) {
//     return this.repo.delete(id);
//   }
// }


// Archivo: src/app/geo_unidades-transporte/geo_unidades-transporte.service.ts (NestJS)

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGeoUnidadesTransporteDto } from './dto/create-geo_unidades-transporte.dto';
import { GeoUnidadesTransporte } from './entities/geo_unidades-transporte.entity';
import { UpdateGeoUnidadesTransporteDto } from './dto/update-geo_unidades-transporte.dto';
import { RutaStatus } from '../geo_rutas/entities/geo_ruta.entity'; // <-- ¡IMPORTANTE! Importar el Enum

@Injectable()
export class GeoUnidadesTransporteService {
  constructor(
    @InjectRepository(GeoUnidadesTransporte)
    private readonly repo: Repository<GeoUnidadesTransporte>,
  ) {}

  // --- MÉTODO NUEVO ---
  // Devuelve solo las unidades activas que NO están asignadas a una ruta 'PLANEADA' o 'EN_CURSO'.
  async findAvailable(): Promise<GeoUnidadesTransporte[]> {
    return this.repo.createQueryBuilder('unidad')
      .where('unidad.activo = :isActive', { isActive: 1 }) // Solo unidades activas
      .andWhere(qb => {
        // Subconsulta para encontrar unidades en rutas activas
        const subQuery = qb.subQuery()
          .select('1')
          .from('geo_rutas', 'ruta')
          .where('ruta.idUnidadTransporte = unidad.idUnidadTransporte')
          .andWhere("ruta.statusRuta IN (:...statuses)", { 
            statuses: [RutaStatus.PLANEADA, RutaStatus.EN_CURSO] 
          })
          .getQuery();
        
        // La condición principal es que la unidad NO EXISTA en la subconsulta
        return `NOT EXISTS (${subQuery})`;
      })
      .getMany();
  }

  // --- MÉTODOS EXISTENTES (sin cambios) ---
  create(dto: CreateGeoUnidadesTransporteDto) {
    const unidad = this.repo.create(dto);
    return this.repo.save(unidad);
  }

  findAll() {
    return this.repo.find({ relations: ['tipoUnidad'] });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { idUnidadTransporte: id },
      relations: ['tipoUnidad'],
    });
  }

  update(id: number, dto: UpdateGeoUnidadesTransporteDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}