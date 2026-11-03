import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity.js';
import { IsNull, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor (
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
    private readonly jwtService: JwtService
  ){}
  async login(body:any){
    const { id, contrasena} = body;
    if(!contrasena) {throw new BadRequestException("Constraseña requerida")}

    const usuarioEncontrado = await this.usuarioRepo.findOne({
      where:{
        id:id,
        eliminado_en:IsNull()
      }
    });
    if (!usuarioEncontrado) {
      throw new UnauthorizedException("El usuario no fue encontrado");
    }
    const esContrasenaValida = await bcrypt.compare(contrasena, usuarioEncontrado.contrasena);
    if (!esContrasenaValida){
      throw new UnauthorizedException("Las credenciales introducidas son incorrectas")
    }

    const payload = {
      id:usuarioEncontrado.id,
      rol:usuarioEncontrado.rol
    };
    const tokenGenerado = this.jwtService.sign(payload);
    return {
      id:usuarioEncontrado.id,
      nombre: usuarioEncontrado.nombre_completo,
      rol:usuarioEncontrado.rol,
      access_token:tokenGenerado,
      message: "Acceso concedio al sistema"
    }
  };
  async logout (){
    return {
      message:"Sesion cerrada correctamente"
    }
  }
}
