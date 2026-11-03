import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateObraDto } from './dto/create-obra.dto.js';
import { UpdateObraDto } from './dto/update-obra.dto.js';
import { Obra } from './entities/obra.entity.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Departamento } from '../entidades/departamento.entity.js';
import { Autore } from '../autores/entities/autore.entity.js';
import { Region } from '../entidades/region.entity.js';
import { Cultura } from '../entidades/cultura.entity.js';
import { Categoria } from '../entidades/categoria.entity.js';
@Injectable()
export class ObrasService {
  constructor(
    @InjectRepository(Obra)
    private readonly obraRepo:Repository<Obra>,
    @InjectRepository(Departamento)
    private readonly deptoRepo:Repository<Departamento>,
    @InjectRepository(Autore)
    private readonly autorRepo:Repository<Autore>,
    @InjectRepository(Region)
    private readonly regionRepo:Repository<Region>,
    @InjectRepository(Cultura)
    private readonly culturaRepo:Repository<Cultura>,
    @InjectRepository(Categoria)
    private readonly categoriaRepo:Repository<Categoria>,
  ){}
  async create(createObraDto: CreateObraDto, file:Express.Multer.File ) {
    if (!file){throw new BadRequestException('El archivo PDF es obligatorio')};
    const departamento = await this.deptoRepo.findOne({where:{ nombre:createObraDto.departamento}});
    if(!departamento){throw new NotFoundException('Departamento no encontrado')};
    const autor = await this.autorRepo.findOne({where:{nombre_completo:createObraDto.autor}});
    if(!autor){throw new NotFoundException('Autor no encontrado')};
    const region = await this.regionRepo.findOne({where:{nombre:createObraDto.region}});
    if(!region){throw new NotFoundException('Region no encontrada')};
    const cultura = await this.culturaRepo.findOne({where:{nombre:createObraDto.cultura}});
    if(!cultura){throw new NotFoundException('Cultura no encontrada')};
    const categoria = await this.categoriaRepo.findOne({where:{nombre:createObraDto.categoria}});
    if(!categoria){throw new NotFoundException('Categoria no encontrada')};
    const nuevaObra = this.obraRepo.create({
      titulo:createObraDto.titulo,
      sinopsis:createObraDto.sinopsis,
      anio_publicacion:createObraDto.anio_publicacion,
      autor:{id:autor.id},
      categoria:{id:categoria.id},
      cultura:{id:cultura.id},
      departamento:{id:departamento.id},
      region:{id:region.id},
      usuario:{id:Number(createObraDto.usuario)},
      url_pdf:file.path
    });
    return await this.obraRepo.save(nuevaObra)
  }

  async findAll() {
    return await this.obraRepo.find();
  }

  async findOne(id: number) {
    return await this.obraRepo.findOne({where:{id:id}});
  }

  async update(id: number, updateObraDto: UpdateObraDto) {
    return await `This action updates a #${id} obra`;
  }

  async remove(id: number) {
    return `This action removes a #${id} obra`;
  }

  //SERVICIO DE LAS TABLAS MAESTRAS
  async findAllCatregory(){
    return await this.categoriaRepo.find();
  }
  async findByCategory(id:number){
    return await this.obraRepo.find({
      where:{categoria:{id:id}},
      relations:{categoria:true}
    })
  }

  async findAllDepto(){
    return await this.deptoRepo.find()
  }
  async findByDepto(id:number){
    return await this.obraRepo.find({
      where:{departamento:{id:id}}
    })
  }

  async findAllCulture(){
    return await this.culturaRepo.find();
  }
  async findByCulture(id:number){
    return await this.obraRepo.find({
      where:{cultura:{id:id}}
    })
  }

  async findAllRegin(){
    return await this.regionRepo.find()
  }
  
  async findByRegion(id:number){
    return await this.obraRepo.find({
      where:{region:{id:id}}
    })
  }
  async registrarDescarga(id:number){
    const obra = await this.obraRepo.findOne({where:{id}})
    if(!obra){ throw new NotFoundException('Obra no encontrada')}

    obra.descargas+=1;
    await this.obraRepo.save(obra)
    return obra.titulo;
  }
}
