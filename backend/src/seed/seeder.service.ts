import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Departamento } from "../obras/entities/departamento.entity.js";
import { Repository } from "typeorm";
import { Region } from "../obras/entities/region.entity.js";
import { Categoria } from "../obras/entities/categoria.entity.js";
import { Cultura } from "../obras/entities/cultura.entity.js";

@Injectable()
export class SeederService implements OnApplicationBootstrap{
    constructor(
        @InjectRepository(Departamento)
        private readonly deptoRepo: Repository<Departamento>,
        @InjectRepository(Region)
        private readonly regionRepo: Repository<Region>,
        @InjectRepository(Categoria)
        private readonly catRepo: Repository<Categoria>,
        @InjectRepository(Cultura)
        private readonly culturaRepo: Repository<Cultura>,
    ){}

    async onApplicationBootstrap() {
        console.log('Revisando inicialización de catálogos maestros (Seeders)...');
        await this.seedDepartamentos();
        await this.seedRegiones();
        await this.seedCategorias();
        await this.seedCulturas();
        console.log('Verificación de Seeders completada.');
    }
    private async seedDepartamentos() {
        const count = await this.deptoRepo.count();
        if (count === 0) {
        const deptos = [
            { nombre: 'La Paz' }, { nombre: 'Cochabamba' }, { nombre: 'Santa Cruz' },
            { nombre: 'Oruro' }, { nombre: 'Potosí' }, { nombre: 'Tarija' },
            { nombre: 'Chuquisaca' }, { nombre: 'Beni' }, { nombre: 'Pando' }
        ];
        await this.deptoRepo.save(deptos);
        console.log('Departamentos insertados.');
        }
    }

    private async seedRegiones() {
        const count = await this.regionRepo.count();
        if (count === 0) {
        const regiones = [
            { nombre: 'Altiplano' }, { nombre: 'Valles' }, 
            { nombre: 'Llanos' }, { nombre: 'Amazonía' }
        ];
        await this.regionRepo.save(regiones);
        console.log('Regiones insertadas.');
        }
    }

    private async seedCategorias() {
        const count = await this.catRepo.count();
        if (count === 0) {
        const categorias = [
            { nombre: 'Cuento' }, { nombre: 'Leyenda' }, 
            { nombre: 'Mito' }, { nombre: 'Fábula' }
        ];
        await this.catRepo.save(categorias);
        console.log('Categorías insertadas.');
        }
    }

    private async seedCulturas() {
        const count = await this.culturaRepo.count();
        if (count === 0) {
        const culturas = [
            { nombre: 'Aymara' }, { nombre: 'Quechua' }, 
            { nombre: 'Guaraní' }, { nombre: 'Mestiza' },
            { nombre: 'Afroboliviana' }, { nombre: 'Chiquitana' }
        ];
        await this.culturaRepo.save(culturas);
        console.log('Culturas originarias insertadas.');
        }
    }
}