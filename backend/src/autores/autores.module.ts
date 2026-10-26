import { Module } from '@nestjs/common';
import { AutoresService } from './autores.service.js';
import { AutoresController } from './autores.controller.js';

@Module({
  controllers: [AutoresController],
  providers: [AutoresService],
})
export class AutoresModule {}
