import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User])], // Importamos la entidad
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // MUY IMPORTANTE: Exportamos el servicio para que AuthModule pueda usarlo
})
export class UsersModule {}
