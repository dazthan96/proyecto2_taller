import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAutoreDto } from './dto/create-autore.dto.js';
import { UpdateAutoreDto } from './dto/update-autore.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Autore } from './entities/autore.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class AutoresService {
  constructor(
    @InjectRepository(Autore)
    private readonly autorRepo:Repository<Autore>,
  ){}
  async create(createAutoreDto: CreateAutoreDto) {
    const autor =  this.autorRepo.create(createAutoreDto);
    return await this.autorRepo.save(autor);
  }

  async findAll() {
    return await this.autorRepo.find();
  }

  async findOne(id: number) {
    const autor = await this.autorRepo.findOne({
      where:{id:id},
      relations:{obras:true},
      select:{
        id:true, nombre_completo:true, biografia:true,tipo:true,
        obras:{
          id:true,titulo:true, sinopsis:true, url_pdf:true, anio_publicacion:true, descargas:true, creado_en:true
        }
      }
    })
    if(!autor){throw new NotFoundException("El autor no existe")}
    return autor;
  }

  async update(id: number, updateAutoreDto: UpdateAutoreDto) {
    const autor = await this.autorRepo.findOneBy({id:id})
    if(!autor){throw new NotFoundException("Autor no encontrado")}
    return await this.autorRepo.update(id, updateAutoreDto)
  }

  async remove(id: number) {
    const autor = await this.autorRepo.findOneBy({id:id})
    if(!autor){throw new NotFoundException("Autor no encontrado")}
    return await this.autorRepo.softDelete(id)
  }
}
