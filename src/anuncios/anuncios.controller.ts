/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AnunciosService } from './anuncios.service';
import { CreateAnuncioDto } from './dto/create-anuncio.dto';
import { UpdateAnuncioDto } from './dto/update-anuncio.dto';
import { AuthGuard } from 'src/auth/guards/auth.guards';

@Controller('anuncios')
export class AnunciosController {
  constructor(private readonly anunciosService: AnunciosService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createAnuncioDto: CreateAnuncioDto, @Req() request:any) {
    const user = request.user;
    const username = user.username;
    return this.anunciosService.create(createAnuncioDto, username);
  }

  @Get()
  findAll() {
    return this.anunciosService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.anunciosService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnuncioDto: UpdateAnuncioDto, @Req() request:any) {
    const user = request.user;
    const username = user.username;
    const rol = user.rol;
    return this.anunciosService.update(id, updateAnuncioDto, username, rol);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() request:any) {
    const user = request.user;
    const username = user.username;
    const rol = user.rol;
    return this.anunciosService.remove(id, rol, username);
  }
}
