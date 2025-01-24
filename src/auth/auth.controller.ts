/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, HttpCode, HttpStatus, Inject, Post, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';
import { UsuariosService } from 'src/usuarios/usuarios.service';


@Controller('auth')
export class AuthController {

    constructor( @Inject() private usuariosService: UsuariosService,
                @Inject() private jwtService: JwtService
            ) {    }



    @Post ("/signup")
    async registrarNuevoUsuario ( @Body() createUsuarioDto : CreateUsuarioDto) {
        createUsuarioDto.password = await bcryptjs.hash(createUsuarioDto.password, 10);
        return this.usuariosService.create(createUsuarioDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post("/login")
    async iniciarSesion ( @Body() usuario: CreateUsuarioDto) {

        const elUsuario = await this.usuariosService.findByUserName(usuario.username);
        if (!elUsuario) throw new UnauthorizedException("No se encuentra al usuario");

        const passOk = await bcryptjs.compare(usuario.password, elUsuario.password);
        if (!passOk) throw new UnauthorizedException("Fallo de Token");

        const payload = { username: elUsuario.username, rol: elUsuario.rol }
        const miToken = await this.jwtService.signAsync(payload);

        const miRefreshToken = await this.jwtService.signAsync(payload, { expiresIn: "1h"});

        return { access_token: miToken, refresh_token: miRefreshToken }
    }

    @Post("/refresh")
    async refresh(@Body() body) {
       
        const actual_refresh_token = body.refresh_token;
        if(!actual_refresh_token) throw new UnauthorizedException();
       
        try {

            const payload = this.jwtService.verifyAsync(actual_refresh_token);
            
            const miToken = await this.jwtService.signAsync(payload);
            const mi_refresh_token = await this.jwtService.signAsync(payload, { expiresIn: "1h"});

            return { access_token : miToken, refresh_token: mi_refresh_token};

        } catch {
            throw new UnauthorizedException();
        }
    }
}
