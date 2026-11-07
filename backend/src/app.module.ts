import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module.js';
import { AutoresModule } from './autores/autores.module.js';
import { ObrasModule } from './obras/obras.module.js';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { UsuariosModule } from './usuarios/usuarios.module.js';
import { SeederService } from './seed/seeder.service.js';
import { Departamento } from './entidades/departamento.entity.js';
import { Region } from './entidades/region.entity.js';
import { Categoria } from './entidades/categoria.entity.js';
import { Cultura } from './entidades/cultura.entity.js';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
  }),
  ServeStaticModule.forRoot({
    rootPath: join(process.cwd(),'src','upload'),
    serveRoot:'/upload'
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
        //synchronize:true,
        //logging:true
    }),
    inject:[ConfigService]
  }),
  TypeOrmModule.forFeature([Departamento, Region, Categoria, Cultura]),
    AuthModule, AutoresModule, ObrasModule, UsuariosModule],
  controllers: [],
  providers: [SeederService],
})
export class AppModule {}
