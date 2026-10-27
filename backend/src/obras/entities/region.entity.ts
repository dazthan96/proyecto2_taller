import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Obra } from "./obra.entity.js";

@Entity('region')
export class Region{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true})
    nombre:string;

    @OneToMany(()=>Obra, (obra)=>obra.region)
    obras: Obra[]
}