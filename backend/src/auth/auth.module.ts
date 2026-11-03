import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UsuariosModule } from '../usuarios/usuarios.module.js';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity.js';

@Module({
  imports:[
    TypeOrmModule.forFeature([Usuario]),
    //UsuariosModule,
    //HttpModule,
    JwtModule.register({
      secret:process.env.JWT_SECRET||'fallback_secret',
      signOptions:{expiresIn:'8h'}
    })

  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
