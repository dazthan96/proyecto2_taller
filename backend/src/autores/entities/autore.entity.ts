import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Obra } from "../../obras/entities/obra.entity.js";
@Entity('autor')
export class Autore {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre_completo:string;

    @Column({type:'text', nullable:true})
    biografia:string;

    @Column({type:'enum', enum:['autor', 'recopilador', 'anonimo']})
    tipo:string;

    @DeleteDateColumn()
    eliminado_en:Date;

    @OneToMany(() => Obra,(obra) => obra.autor)
    obras:Obra[];
}
