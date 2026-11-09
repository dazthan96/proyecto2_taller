import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, BadRequestException, UsePipes, ValidationPipe, UploadedFile } from '@nestjs/common';
import { ObrasService } from './obras.service.js';
import { CreateObraDto } from './dto/create-obra.dto.js';
import { UpdateObraDto } from './dto/update-obra.dto.js';
//import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('obras')
export class ObrasController {
  constructor(
    private readonly obrasService: ObrasService
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file',{
      storage:diskStorage({
        destination:'./src/upload',
        filename:(req, file, callback)=>{
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()*1e9);
          callback(null,`obra-${uniqueSuffix}${extname(file.originalname)}` )
        },
      }),
      fileFilter:(req, file, callback)=>{
        if(!file.originalname.match(/\.(pdf)$/i)){
          return callback(new BadRequestException('Solo se permiten archivos PDF'),false)
        }
        callback(null, true)
      }
    }),
  )
  @UsePipes(new ValidationPipe({transform:true}))
  async create(@Body() createObraDto: CreateObraDto, @UploadedFile() file: Express.Multer.File) {
    const obraGuardada = await this.obrasService.create(createObraDto, file)
    return {
      mensaje: 'Obra y archivos PDF registrados exitosamente',
      obra: obraGuardada
    };
  }

  @Get('estadisticas/:criterio')
    async consultarEstadisticas(@Param('criterio') criterio: string) {
      return await this.obrasService.obtenerEstadisticasPor(criterio as any);
    }

  //LISTAR POR TABLA
  @Get('categoria/lista')
  findAllCategories(){
    return this.obrasService.findAllCatregory()
  }
  @Get('categoria/:id')
  findByCategory(@Param('id') id: string) {
    return this.obrasService.findByCategory(+id);
  }

  @Get('departamento/lista')
  findAllDepto(){
    return this.obrasService.findAllDepto()
  }
  @Get('departamento/:id')
  findByDepto(@Param('id') id: string) {
    return this.obrasService.findByDepto(+id);
  }
    
  @Get('cultura/lista')
  findAllCulture(){
    return this.obrasService.findAllCulture()
  }
  @Get('cultura/:id')
  findByCulture(@Param('id') id: string) {
    return this.obrasService.findByCulture(+id);
  }

  @Get('region/lista')
  findAllRegion(){
    return this.obrasService.findAllRegin()
  }
  @Get('region/:id')
  findByRegion(@Param('id') id: string) {
    return this.obrasService.findByRegion(+id);
  }

  @Get(':id/descargar')
  async descargar(@Param('id') id:string){
    return await this.obrasService.registrarDescarga(+id);
  }

  @Get()
  findAll() {
    return this.obrasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.obrasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateObraDto: UpdateObraDto) {
    return this.obrasService.update(+id, updateObraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.obrasService.remove(+id);
  }

  
}
