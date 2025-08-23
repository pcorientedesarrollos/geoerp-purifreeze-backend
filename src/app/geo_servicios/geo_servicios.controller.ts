import { Controller, Get, Param, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { ServiciosService } from './geo_servicios.service';
import { CreateGeoServicioDto } from './dto/create-geo_servicio.dto';

@Controller('geo-servicios')
export class ServiciosController {
  constructor(private readonly serviciosService: ServiciosService) {}

  @Get()
  async todosLosServicios(): Promise<CreateGeoServicioDto[]> {
     return this.serviciosService.findAllServices();
  }

  @Get('cliente/:idCliente')
  async getServiciosPorCliente(
    @Param('idCliente', ParseIntPipe) idCliente: number,
  ): Promise<CreateGeoServicioDto[]> {
    try {
      return await this.serviciosService.findServiciosByClienteId(idCliente);
    } catch (error) {
      throw new HttpException('No se pudieron obtener los servicios.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}