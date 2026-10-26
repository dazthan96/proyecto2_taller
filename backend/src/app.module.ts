import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { AutoresModule } from './autores/autores.module.js';
import { ObrasModule } from './obras/obras.module.js';
import {TypeOrmModule} from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import {ConfigModule} from '@nestjs/config';
import { config, env } from 'node:process';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
  }),
  ServeStaticModule.forRoot({
    serve
  }),
    AuthModule, AutoresModule, ObrasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
