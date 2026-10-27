import { Module } from '@nestjs/common';
import { ObrasService } from './obras.service.js';
import { ObrasController } from './obras.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Obra } from './entities/obra.entity.js';
import { Departamento } from './entities/departamento.entity.js';
import { Autore } from '../autores/entities/autore.entity.js';
import { Region } from './entities/region.entity.js';
import { Cultura } from './entities/cultura.entity.js';
import { Categoria } from './entities/categoria.entity.js';
import { Usuario } from '../usuarios/entities/usuario.entity.js';

@Module({
  imports:[TypeOrmModule.forFeature([Obra, Departamento, Autore, Region, Cultura, Categoria, Usuario])],
  controllers: [ObrasController],
  providers: [ObrasService],
})
export class ObrasModule {}
