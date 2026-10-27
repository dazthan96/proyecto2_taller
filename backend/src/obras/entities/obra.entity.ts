import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Departamento } from "./departamento.entity.js";
import { Autore } from "../../autores/entities/autore.entity.js";
import { Region } from "./region.entity.js";
import { Cultura } from "./cultura.entity.js";
import { Categoria } from "./categoria.entity.js";
import { Usuario } from "../../usuarios/entities/usuario.entity.js";

@Entity('obra')
export class Obra {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    titulo:string;

    @Column()
    sinopsis:string;

    @Column()
    url_pdf:string;

    @Column({nullable:true})
    anio_publicacion:number;

    @Column({default:0})
    descargas:number;

    @CreateDateColumn()
    creado_en: Date

    @ManyToOne(()=>Departamento, (departamento)=>departamento.obras, {eager:true})
    @JoinColumn({name: 'departamento_id'})
    departamento:Departamento;

    @ManyToOne(()=>Autore, (autor)=>autor.obras,{eager:true})
    @JoinColumn({name:'autor'})
    autor:Autore;

    @ManyToOne(()=>Region, (region)=>region.obras, {eager:true})
    @JoinColumn({name:'region'})
    region:Region;

    @ManyToOne(()=>Cultura, (cultura)=>cultura.obras, {eager:true})
    @JoinColumn({name:'cultura'})
    cultura:Cultura; 

    @ManyToOne(()=>Categoria, (categoria)=>categoria.obras,{eager:true})
    @JoinColumn({name:'categoria'})
    categoria: Categoria;

    @ManyToOne(()=>Usuario, (usuario)=>usuario.obraCreados,{eager:true})
    @JoinColumn({name:'usuario_creador'})
    usuario: Usuario;
}
