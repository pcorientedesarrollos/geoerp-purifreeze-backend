// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { GeoServiciosService } from './geo_servicios.service';
// import { CreateGeoServicioDto } from './dto/create-geo_servicio.dto';
// import { UpdateGeoServicioDto } from './dto/update-geo_servicio.dto';

// @Controller('geo-servicios')
// export class GeoServiciosController {
//   constructor(private readonly geoServiciosService: GeoServiciosService) {}

//   @Post()
//   create(@Body() createGeoServicioDto: CreateGeoServicioDto) {
//     return this.geoServiciosService.create(createGeoServicioDto);
//   }

//   @Get()
//   findAll() {
//     return this.geoServiciosService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.geoServiciosService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateGeoServicioDto: UpdateGeoServicioDto) {
//     return this.geoServiciosService.update(+id, updateGeoServicioDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.geoServiciosService.remove(+id);
//   }
// }


// Contenido para reemplazar completamente el archivo existente
import { Controller, Get, Param, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { ServiciosService } from './geo_servicios.service';
import { CreateGeoServicioDto } from './dto/create-geo_servicio.dto';

@Controller('geo-servicios')
export class ServiciosController {
  constructor(private readonly serviciosService: ServiciosService) {}

  /**
   * Endpoint para obtener los servicios de un cliente por su ID.
   * La ruta será: GET /servicios/cliente/123
   */
  @Get('cliente/:idCliente')
  async getServiciosPorCliente(
    @Param('idCliente', ParseIntPipe) idCliente: number,
  ): Promise<CreateGeoServicioDto[]> {
    try {
      return await this.serviciosService.findServiciosByClienteId(idCliente);
    } catch (error) {
      // Si el servicio lanza un error, lo capturamos y devolvemos un error 500.
      throw new HttpException('No se pudieron obtener los servicios.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}