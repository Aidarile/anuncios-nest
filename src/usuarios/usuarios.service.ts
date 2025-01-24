import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './entities/usuario.entity';
import { Model } from 'mongoose';


@Injectable()
export class UsuariosService {

  constructor(@InjectModel(Usuario.name) private userModel: Model<Usuario>) {
  }

  create(createUsuarioDto: CreateUsuarioDto) {
    const nuevoUsuario = new this.userModel(createUsuarioDto);
    return nuevoUsuario.save();
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    return this.userModel.findByIdAndUpdate(id, updateUsuarioDto).exec();
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  findByUserName(username: string) {
    return this.userModel.findOne( { username: username } ).exec();
  }
}
