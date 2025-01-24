import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AnunciosModule } from './anuncios/anuncios.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsuariosModule, 
    AnunciosModule,
    MongooseModule.forRoot("mongodb+srv://aidagm:1234@mongoose.0kw2i.mongodb.net"),
    AuthModule
          ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
