import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeoRutasModule } from './app/geo_rutas/geo_rutas.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv'; 
import { GeoRutasDetalleModule } from './app/geo_rutas-detalle/geo_rutas-detalle.module';
config(); // Cargar variables de entorno desde .env

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
      
      synchronize: true, // Solo para desarrollo, no usar en producción


      extra: {
        connectionLimit: 10,
        keepAliveInitialDelay: 10000,
        enableKeepAlive: true,
      },
    }),

    GeoRutasModule,
    GeoRutasDetalleModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
