import { forwardRef, Module } from '@nestjs/common';
import { AutoresService } from './autores.service.js';
import { AutoresController } from './autores.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ObrasModule } from '../obras/obras.module.js';
import { Autore } from './entities/autore.entity.js';

@Module({
  imports:[TypeOrmModule.forFeature([Autore]),
  forwardRef(()=>ObrasModule)
  ],
  controllers: [AutoresController],
  providers: [AutoresService],
})
export class AutoresModule {}
