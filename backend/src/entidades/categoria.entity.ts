import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Obra } from "../obras/entities/obra.entity.js";

@Entity('categoria')
export class Categoria{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true})
    nombre:string;

    @OneToMany(()=>Obra, (obra)=>obra.categoria)
    obras:Obra[]
}