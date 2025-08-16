import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// Rutas de importación que coinciden con tu estructura actual
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './app/users/users.module'; // Ruta a /app/users
import { GeoClientesModule } from './app/geo_clientes/geo_clientes.module';
import { GeoRutasModule } from './app/geo_rutas/geo_rutas.module';
import { GeoRutasDetalleModule } from './app/geo_rutas-detalle/geo_rutas-detalle.module';
import { GeoTipoServiciosModule } from './app/geo_tipo-servicios/geo_tipo-servicios.module';
import { GeoUnidadesTransporteModule } from './app/geo_unidades-transporte/geo_unidades-transporte.module';
import { GeoClientesDireccionModule } from './app/geo_clientes-direccion/geo_clientes-direccion.module';
import { GeoRecorridoModule } from './app/geo-recorrido/geo-recorrido.module';
import { GeoServiciosModule } from './app/geo_servicios/geo_servicios.module';
import { GeoStatusModule } from './app/geo_status/geo_status.module';
import { EventsModule } from './app/events/events.module';

config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      extra: {
        connectionLimit: 10,
        keepAliveInitialDelay: 10000,
        enableKeepAlive: true,
      },
    }),

    // Lista de módulos limpia, sin duplicados y con las rutas correctas
    AuthModule,
    UsersModule,
    GeoClientesModule,
    GeoRutasModule,
    GeoRutasDetalleModule,
    GeoUnidadesTransporteModule,
    GeoTipoServiciosModule,
    GeoClientesDireccionModule,
    GeoRecorridoModule,
    GeoServiciosModule,
    GeoStatusModule,
    EventsModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
