// import { Injectable } from '@nestjs/common';
// import { CreateGeoServicioDto } from './dto/create-geo_servicio.dto';
// import { UpdateGeoServicioDto } from './dto/update-geo_servicio.dto';

// @Injectable()
// export class GeoServiciosService {
//   create(createGeoServicioDto: CreateGeoServicioDto) {
//     return 'This action adds a new geoServicio';
//   }

//   findAll() {
//     return `This action returns all geoServicios`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} geoServicio`;
//   }

//   update(id: number, updateGeoServicioDto: UpdateGeoServicioDto) {
//     return `This action updates a #${id} geoServicio`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} geoServicio`;
//   }
// }


// Contenido para reemplazar completamente el archivo existente
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { CreateGeoServicioDto } from './dto/create-geo_servicio.dto';

@Injectable()
export class ServiciosService {
  constructor(
    private readonly entityManager: EntityManager,
  ) {}

  async findServiciosByClienteId(idCliente: number): Promise<CreateGeoServicioDto[]> {
    
    // ===== INICIO DE LA CONSULTA DEFINITIVA (Basada en tu Navicat) =====
    // Esta es la consulta que funciona en tu base de datos.
    // He omitido el JOIN a 'catalogo_tecnicos' porque no se usa ningún
    // campo de esa tabla en el SELECT, pero la lógica principal es idéntica.
    const query = `
      SELECT 
          sq.idServicioEquipo, 
          es.NoSerie,
          es.nombreEquipo, 
          sq.fechaServicio, 
          sq.hora,
          sq.status, 
          sq.tipo_servicio, 
          sq.descripcion, 
          sq.observaciones_servicio,  
          sq.idContrato, 
          ec.idCliente,
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
          ec.idCliente = ?;
    `;
    // ===== FIN DE LA CONSULTA DEFINITIVA =====

    try {
      const servicios = await this.entityManager.query(query, [idCliente]);
      return servicios;
    } catch (error) {
      console.error('Error al ejecutar la consulta de servicios por cliente:', error);
      throw new InternalServerErrorException('Ocurrió un error al buscar los servicios del cliente.');
    }
  }
}