import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module.js';
import { AutoresModule } from './autores/autores.module.js';
import { ObrasModule } from './obras/obras.module.js';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { config, env } from 'node:process';
import { UsuariosModule } from './usuarios/usuarios.module.js';
import { SeederService } from './seed/seeder.service.js';
import { Departamento } from './obras/entities/departamento.entity.js';
import { Region } from './obras/entities/region.entity.js';
import { Categoria } from './obras/entities/categoria.entity.js';
import { Cultura } from './obras/entities/cultura.entity.js';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
  }),
  TypeOrmModule.forRootAsync({
    imports:[ConfigModule],
    useFactory:(config:ConfigService)=>({
      type:'postgres',
      host:config.get('DB_HOST'),
      port: config.get<number>('DB_PORT'),
        username:config.get('DB_USERNAME'),
        password:config.get('DB_PASSWORD'),
        database:config.get('DB_DATABASE'),
        autoLoadEntities:true,
        synchronize:true,
    }),
    inject:[ConfigService]
  }),
  TypeOrmModule.forFeature([Departamento, Region, Categoria, Cultura]),
    AuthModule, AutoresModule, ObrasModule, UsuariosModule],
  controllers: [],
  providers: [SeederService],
})
export class AppModule {}
