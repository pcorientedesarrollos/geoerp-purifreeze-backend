import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users') // La ruta base sigue siendo /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // No hay más métodos por ahora. ¡Limpio y sin errores!
}
