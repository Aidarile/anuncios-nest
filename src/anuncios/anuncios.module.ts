
import { Module } from '@nestjs/common';
import { AnunciosService } from './anuncios.service';
import { AnunciosController } from './anuncios.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Anuncio, AnuncioSchema } from './entities/anuncio.entity';

@Module({
  imports: [MongooseModule.forFeature(
    [
      { name: Anuncio.name, schema: AnuncioSchema}
    ]
  )],
  controllers: [AnunciosController],
  providers: [AnunciosService],
  exports: [AnunciosService]
})
export class AnunciosModule {}
