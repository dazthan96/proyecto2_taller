import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Obra } from "./obra.entity.js";

@Entity('departamento')
export class Departamento{
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column({unique:true, })
    nombre:string;

    @OneToMany(()=>Obra,(cuento)=>cuento.departamento)
    obras:Obra[];
}