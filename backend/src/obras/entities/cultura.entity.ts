import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Obra } from "./obra.entity.js";

@Entity('cultura')
export class Cultura{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true})
    nombre:String;

    @OneToMany(()=>Obra, (obra)=> obra.cultura)
    obras:Obra[]
}