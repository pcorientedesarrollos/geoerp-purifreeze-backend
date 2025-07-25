// // src/geo_rutas/geo_rutas.service.ts

// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { CreateGeoRutaDto } from './dto/create-geo_ruta.dto';
// import { UpdateGeoRutaDto } from './dto/update-geo_ruta.dto';
// import { GeoRutaEntity } from './entities/geo_ruta.entity';

// @Injectable()
// export class GeoRutasService {
//   constructor(
//     @InjectRepository(GeoRutaEntity)
//     private readonly geoRutaRepository: Repository<GeoRutaEntity>,
//   ) {}

//   async obtenerResumenRutas() {
//     // CORREGIDO: Se eliminó la unión con la tabla 'clientes' y el campo 'nombreComercio'
//     // ya que 'idCliente' no existe en 'geo_rutas'.
//     const query = `
//      SELECT 
//         gr.idRuta,
//         u.usuario,
//         gut.nombreUnidad,
//         gr.kmlInicial,
//         gr.fecha_hora,
//         gr.idTipoServicio 
//       FROM geo_rutas gr 
//       LEFT JOIN usuarios u ON u.idUsuario = gr.idUsuario 
//       LEFT JOIN geo_unidadTransporte gut ON gut.idUnidadTransporte = gr.idUnidadTransporte
//       ORDER BY idRuta DESC
//     `;
//     return await this.geoRutaRepository.query(query);
//   }

// async create(createGeoRutaDto: CreateGeoRutaDto): Promise<GeoRutaEntity> {
//   const nuevaRuta = this.geoRutaRepository.create(createGeoRutaDto);
//   return this.geoRutaRepository.save(nuevaRuta);
// }

//   findAll(): Promise<GeoRutaEntity[]> {
//     return this.geoRutaRepository.find({
//       order: { idRuta: 'DESC' }, // Es común ordenar por ID para ver las más recientes
//       relations: ['paradas'],
//     });
//   }

//   async findOne(id: number): Promise<GeoRutaEntity> {
//     const ruta = await this.geoRutaRepository.findOne({
//       where: { idRuta: id },
//       relations: ['paradas', 'detalles'], // Carga ambas relaciones
//     });
//     if (!ruta) {
//       throw new NotFoundException(
//         `La ruta con el ID #${id} no fue encontrada.`,
//       );
//     }
//     return ruta;
//   }

//   async update(
//     id: number,
//     updateGeoRutaDto: UpdateGeoRutaDto,
//   ): Promise<GeoRutaEntity> {
//     // Asegúrate de que las paradas no se eliminen si no se envían en el DTO de actualización
//     const rutaExistente = await this.findOne(id);
//     const rutaActualizada = this.geoRutaRepository.merge(
//       rutaExistente,
//       updateGeoRutaDto,
//     );

//     return this.geoRutaRepository.save(rutaActualizada);
//   }

//   async remove(id: number): Promise<{ message: string }> {
//     const result = await this.geoRutaRepository.delete(id);
//     if (result.affected === 0) {
//       throw new NotFoundException(
//         `La ruta con el ID #${id} no fue encontrada para eliminar.`,
//       );
//     }
//     return { message: `La ruta con el ID #${id} ha sido eliminada.` };
//   }
// }




import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGeoRutaDto } from './dto/create-geo_ruta.dto';
import { UpdateGeoRutaDto } from './dto/update-geo_ruta.dto';
import { GeoRutaEntity } from './entities/geo_ruta.entity';
// ¡Importante! Asegúrate de que la ruta a tu entidad de Parada sea correcta
import { GeoRutasParadaEntity } from 'src/app/geo-rutas-paradas/entities/geo-rutas-parada.entity';

@Injectable()
export class GeoRutasService {
  constructor(
    @InjectRepository(GeoRutaEntity)
    private readonly geoRutaRepository: Repository<GeoRutaEntity>,
    
    // Inyectamos el repositorio de Paradas para poder usarlo directamente
    @InjectRepository(GeoRutasParadaEntity)
    private readonly paradaRepository: Repository<GeoRutasParadaEntity>,
  ) {}

  async obtenerResumenRutas() {
    // Tu código existente aquí...
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

  // --- MÉTODO CREATE CORREGIDO Y ROBUSTO ---
  async create(createGeoRutaDto: CreateGeoRutaDto): Promise<GeoRutaEntity> {
    // 1. Separamos las paradas del resto de los datos de la ruta
    const { paradas, ...rutaData } = createGeoRutaDto;

    // 2. Creamos y guardamos la entidad de la ruta principal PRIMERO.
    // Esto es crucial porque genera el 'idRuta' que necesitamos para las paradas.
    const nuevaRuta = this.geoRutaRepository.create(rutaData);
    const rutaGuardada = await this.geoRutaRepository.save(nuevaRuta);

    // 3. Verificamos si se proporcionaron paradas en la solicitud
    if (paradas && paradas.length > 0) {
      // 4. Mapeamos cada DTO de parada a una entidad de parada,
      //    asignando explícitamente el ID de la ruta que acabamos de guardar.
      const paradasAGuardar = paradas.map(paradaDto => 
        this.paradaRepository.create({
          ...paradaDto,
          ruta: rutaGuardada, // Vinculamos la parada a la entidad de ruta completa
        })
      );
      
      // 5. Guardamos todas las entidades de parada en la base de datos de una sola vez.
      await this.paradaRepository.save(paradasAGuardar);
    }
    
    // 6. Volvemos a buscar la ruta guardada, pero esta vez cargando la relación 'paradas'
    //    para devolver el objeto completo y consistente al frontend.
    return this.findOne(rutaGuardada.idRuta);
  }

  findAll(): Promise<GeoRutaEntity[]> {
    return this.geoRutaRepository.find({
      order: { idRuta: 'DESC' },
      relations: ['paradas'],
    });
  }

  async findOne(id: number): Promise<GeoRutaEntity> {
    const ruta = await this.geoRutaRepository.findOne({
      where: { idRuta: id },
      relations: ['paradas', 'detalles'],
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
