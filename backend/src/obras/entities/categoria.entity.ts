import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Obra } from "./obra.entity.js";

@Entity('categoria')
export class Categoria{
    @PrimaryGeneratedColumn()
    id:string;

    @Column({unique:true})
    nombre:string;

    @OneToMany(()=>Obra, (obra)=>obra.categoria)
    obras:Obra[]
}