
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGeoUnidadesTransporteDto } from './dto/create-geo_unidades-transporte.dto';
import { GeoUnidadesTransporte } from './entities/geo_unidades-transporte.entity';
import { UpdateGeoUnidadesTransporteDto } from './dto/update-geo_unidades-transporte.dto';

// La importación de 'RutaStatus' ha sido eliminada.

@Injectable()
export class GeoUnidadesTransporteService {

  // ===================== ¡CORRECCIÓN CLAVE! =====================
  // Definimos los IDs de los estados que consideramos "no disponibles"
  // Asumimos que 1 = 'Planeada'/'Confirmado' y 2 = 'En Curso'
  private readonly RUTA_STATUS_NO_DISPONIBLE: number[] = [1, 2];
  // =============================================================

  constructor(
    @InjectRepository(GeoUnidadesTransporte)
    private readonly repo: Repository<GeoUnidadesTransporte>,
  ) {}

  /**
   * Devuelve solo las unidades activas que NO están asignadas a una ruta 'PLANEADA' o 'EN_CURSO'.
   */
  async findAvailable(): Promise<GeoUnidadesTransporte[]> {
    return this.repo.createQueryBuilder('unidad')
      .where('unidad.activo = :isActive', { isActive: 1 }) // Filtra solo unidades marcadas como activas
      .andWhere(qb => {
        // Subconsulta para encontrar las IDs de unidades que están en rutas activas o planeadas
        const subQuery = qb.subQuery()
          .select('ruta.idUnidadTransporte')
          .from('geo_rutas', 'ruta')
          // Se usa la columna 'idEstatus' y el array de IDs definidos arriba
          .where("ruta.idEstatus IN (:...statuses)", { 
            statuses: this.RUTA_STATUS_NO_DISPONIBLE 
          })
          .getQuery();
        
        // La condición principal es que el ID de la unidad NO ESTÉ en el resultado de la subconsulta
        return `unidad.idUnidadTransporte NOT IN (${subQuery})`;
      })
      .leftJoinAndSelect('unidad.tipoUnidad', 'tipoUnidad') // Aseguramos que cargue la relación
      .getMany();
  }

  // --- MÉTODOS EXISTENTES (con mejoras de robustez) ---

  create(dto: CreateGeoUnidadesTransporteDto): Promise<GeoUnidadesTransporte> {
    const unidad = this.repo.create(dto);
    return this.repo.save(unidad);
  }

  findAll(): Promise<GeoUnidadesTransporte[]> {
    // Ordenar por ID es una buena práctica para consistencia
    return this.repo.find({ 
      relations: ['tipoUnidad'],
      order: { idUnidadTransporte: 'ASC' }
    });
  }

  async findOne(id: number): Promise<GeoUnidadesTransporte> {
    const unidad = await this.repo.findOne({
      where: { idUnidadTransporte: id },
      relations: ['tipoUnidad'],
    });
    if (!unidad) {
      throw new NotFoundException(`Unidad de transporte con ID #${id} no encontrada.`);
    }
    return unidad;
  }

  async update(id: number, dto: UpdateGeoUnidadesTransporteDto): Promise<GeoUnidadesTransporte> {
    const unidad = await this.repo.preload({ idUnidadTransporte: id, ...dto });
    if (!unidad) {
      throw new NotFoundException(`No se encontró la unidad de transporte con ID #${id} para actualizar.`);
    }
    return this.repo.save(unidad);
  }

  async remove(id: number): Promise<void> {
    // Primero, verificamos que la unidad exista para lanzar un error 404 si no.
    const unidad = await this.findOne(id);

    // Verificamos si la unidad está en una ruta activa o planeada
    const qb = this.repo.createQueryBuilder('unidad');
    const rutaAsignada = await qb.subQuery()
      .select('1')
      .from('geo_rutas', 'ruta')
      .where('ruta.idUnidadTransporte = :id', { id })
      .andWhere("ruta.idEstatus IN (:...statuses)", { statuses: this.RUTA_STATUS_NO_DISPONIBLE })
      .getRawOne();
      
    if (rutaAsignada) {
      throw new ConflictException(`No se puede eliminar la unidad #${id} porque está asignada a una ruta activa o planeada.`);
    }

    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      // Esto es un seguro en caso de que la unidad se elimine entre el findOne y el delete
      throw new NotFoundException(`Unidad de transporte con ID #${id} no encontrada para eliminar.`);
    }
  }
}