import { forwardRef, Module } from '@nestjs/common';
import { ObrasService } from './obras.service.js';
import { ObrasController } from './obras.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Obra } from './entities/obra.entity.js';
import { Departamento } from '../entidades/departamento.entity.js';
import { Autore } from '../autores/entities/autore.entity.js';
import { Region } from '../entidades/region.entity.js';
import { Cultura } from '../entidades/cultura.entity.js';
import { Categoria } from '../entidades/categoria.entity.js';
import { Usuario } from '../usuarios/entities/usuario.entity.js';
import { AutoresModule } from '../autores/autores.module.js';
import { UsuariosModule } from '../usuarios/usuarios.module.js';

@Module({
  imports:[
    TypeOrmModule.forFeature([Autore,Obra, Departamento, Region, Cultura, Categoria, Usuario]),
    forwardRef(()=> AutoresModule)
  ],
  controllers: [ObrasController],
  providers: [ObrasService],
})
export class ObrasModule {}
