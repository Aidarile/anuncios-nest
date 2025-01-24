import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Module({
  controllers: [AuthController],
  providers: [UsuariosService]
})

export class AuthModule {}
