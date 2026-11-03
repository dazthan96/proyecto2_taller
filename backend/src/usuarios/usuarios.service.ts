import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto.js';
import { UpdateUsuarioDto } from './dto/update-usuario.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario) 
    private readonly usuarioRepo:Repository<Usuario>
  ){}
  async create(createUsuarioDto: CreateUsuarioDto) {
    const {id, nombre_completo, contrasena} = createUsuarioDto;
    const existe_id = await this.usuarioRepo.findOne({where:{id:id}})
    if(existe_id){throw new BadRequestException("el numero de carnet ya existe")}

    const existe_nombre = await this.usuarioRepo.findOne({where:{nombre_completo:nombre_completo}})
    if(existe_nombre){throw new BadRequestException("El nombre de usuario ya existe")}

    const salt = await bcrypt.genSalt(10)
    const hashContrasenia = await bcrypt.hash(contrasena, salt);
    const nuevo_usuario = this.usuarioRepo.create({
      ...createUsuarioDto,
      contrasena:hashContrasenia,
    })
    return await this.usuarioRepo.save(nuevo_usuario);
  }

  async findAll() {
    return await this.usuarioRepo.find();
  }

  async findOne(id: number) {
    const usuario = await this.usuarioRepo.findOne({where:{id:id}})
    if(!usuario){throw new NotFoundException("Usuario no encontrado o inactivo")}
    return usuario;
  }

  async update(id: number, body:any) {
    const usuario = await this.usuarioRepo.findOne({where:{id:id}});
    if(!usuario){throw new NotFoundException("Usuario no existe")}
    usuario.nombre_completo = body.nombre_completo;
    usuario.rol = body.rol;
    if(body.contrasena){
      const salt = await bcrypt.genSalt(10);
      usuario.contrasena = await bcrypt.hash(body.contrasena,salt)
    }
    return await this.usuarioRepo.save(usuario);
  }

  async remove(id: number) {
    const usuario = await this.usuarioRepo.findOne({where:{id:id}})
    if(!usuario){throw new NotFoundException("Usuario no encontrado")}
    return await this.usuarioRepo.softDelete(id);
  }
}
