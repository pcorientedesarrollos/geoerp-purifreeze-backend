// RUTA: src/app/events/events.module.ts

import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';

@Module({
  providers: [EventsGateway],
  exports: [EventsGateway], // ¡MUY IMPORTANTE! Exportamos el Gateway
})
export class EventsModule {}
