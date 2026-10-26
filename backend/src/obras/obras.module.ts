import { Module } from '@nestjs/common';
import { ObrasService } from './obras.service.js';
import { ObrasController } from './obras.controller.js';

@Module({
  controllers: [ObrasController],
  providers: [ObrasService],
})
export class ObrasModule {}
