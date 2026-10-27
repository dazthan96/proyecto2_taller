import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service.js';
import { UsuariosController } from './usuarios.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity.js';
import { Obra } from '../obras/entities/obra.entity.js';

@Module({
  imports:[TypeOrmModule.forFeature([Usuario,Obra])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
