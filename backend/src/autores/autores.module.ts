import { Module } from '@nestjs/common';
import { AutoresService } from './autores.service.js';
import { AutoresController } from './autores.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Obra } from '../obras/entities/obra.entity.js';

@Module({
  imports:[TypeOrmModule.forFeature([Obra])],
  controllers: [AutoresController],
  providers: [AutoresService],
})
export class AutoresModule {}
