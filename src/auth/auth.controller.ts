import { Body, Controller, Inject, Post } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';
import { UsuariosService } from 'src/usuarios/usuarios.service';


@Controller('auth')
export class AuthController {
    constructor( @Inject() private usuariosService: UsuariosService) {
    }

    @Post ("/singup")
    async registrarNuevoUsuario ( @Body() createUsuarioDto : CreateUsuarioDto) {
        return this.usuariosService.create(createUsuarioDto);
    }
}
