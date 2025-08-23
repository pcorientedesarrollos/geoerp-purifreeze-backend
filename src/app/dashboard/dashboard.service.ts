// RUTA: src/dashboard/dashboard.service.ts (Versión Final Definitiva con Query Builder)

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GeoRutaEntity } from '../geo_rutas/entities/geo_ruta.entity';

export interface DashboardStats {
  vehiculosEnRuta: number;
  distanciaTotal: number;
}

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(GeoRutaEntity)
    private readonly geoRutaRepository: Repository<GeoRutaEntity>,
  ) {}

  async getDashboardStats(
    month?: number,
    year?: number,
  ): Promise<DashboardStats> {
    // 1. Vehículos en Ruta usando el Query Builder
    const vehiculosEnRuta = await this.geoRutaRepository
      .createQueryBuilder('ruta')
      .leftJoin('ruta.status', 'status') // Usa la relación 'status' definida en la entidad
      .where('status.status = :statusValue', { statusValue: 'EnCurso' })
      .getCount();

    // 2. Distancia Total usando el Query Builder
    let distanciaQueryBuilder = this.geoRutaRepository
      .createQueryBuilder('ruta')
      .leftJoin('ruta.status', 'status')
      .where('status.status = :statusValue', { statusValue: 'Finalizada' })
      .select('SUM(ruta.distanciaTotalKm)', 'totalDistance');

    if (month && year) {
      // Filtrado de fecha robusto
      distanciaQueryBuilder
        .andWhere('YEAR(ruta.fechaHora) = :year', { year })
        .andWhere('MONTH(ruta.fechaHora) = :month', { month });
    } else {
      // Por defecto, datos de hoy
      distanciaQueryBuilder.andWhere('DATE(ruta.fechaHora) = CURDATE()');
    }

    const distanciaResult = await distanciaQueryBuilder.getRawOne();
    const distanciaTotal = parseFloat(
      distanciaResult?.totalDistance || 0,
    ).toFixed(2);

    return {
      vehiculosEnRuta: vehiculosEnRuta, // getCount() ya devuelve un número, no un string
      distanciaTotal: Number(distanciaTotal),
    };
  }

  async getLiveLocations() {
    // Esta consulta compleja se mantiene en SQL puro pero corregida
    const query = `
      SELECT
          r.idUnidadTransporte,
          t1.latitud,
          t1.longitud,
          t1.fechaHora AS ultimaActualizacion,
          ut.nombreUnidad
      FROM
          geo_recorrido t1
      INNER JOIN (
          SELECT
              rec.idRuta,
              MAX(rec.fechaHora) AS max_fecha
          FROM
              geo_rutas r_inner
          JOIN
              geo_status s ON r_inner.idEstatus = s.idStatus -- CORRECCIÓN: Usar idEstatus
          JOIN
              geo_recorrido rec ON r_inner.idRuta = rec.idRuta
          WHERE
              s.status = 'EnCurso'
          GROUP BY
              rec.idRuta
      ) t2 ON t1.idRuta = t2.idRuta AND t1.fechaHora = t2.max_fecha
      JOIN geo_rutas r ON t1.idRuta = r.idRuta
      JOIN geo_unidadTransporte ut ON r.idUnidadTransporte = ut.idUnidadTransporte;
    `;
    return this.geoRutaRepository.query(query);
  }
}
