import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { CreateGeoServicioDto } from './dto/create-geo_servicio.dto';
import { promises } from 'dns';

@Injectable()
export class ServiciosService {
  constructor(
    private readonly entityManager: EntityManager,
  ) {}


  async findAllServices(): Promise<CreateGeoServicioDto[]> {
    const query = `CALL todosLosServicios();`;

    try {
      const result = await this.entityManager.query(query);
      return result[0];
    } catch (error) {
      console.error('Error al ejecutar el procedimiento almacenado "todosLosServicios":', error);
      throw new InternalServerErrorException('Ocurrió un error al buscar todos los servicios.');
    }
  }

  async findServiciosByClienteId(idCliente: number): Promise<CreateGeoServicioDto[]> {
    

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

    try {
      const servicios = await this.entityManager.query(query, [idCliente]);
      return servicios;
    } catch (error) {
      console.error('Error al ejecutar la consulta de servicios por cliente:', error);
      throw new InternalServerErrorException('Ocurrió un error al buscar los servicios del cliente.');
    }
  }
}