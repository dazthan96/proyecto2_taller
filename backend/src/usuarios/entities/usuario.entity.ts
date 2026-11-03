import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import type {Relation } from "typeorm";
import { Obra } from "../../obras/entities/obra.entity.js";

@Entity('usuario')
export class Usuario {
    @PrimaryColumn()
    id: number;

    @Column({ unique: true })
    correo: string;

    @Column()
    contrasena: string;

    @Column()
    nombre_completo: string;

    @Column({ type: 'enum', enum: ['admin', 'editor', 'visitante'] })
    rol: string;

    @DeleteDateColumn()
    eliminado_en:Date;

    @CreateDateColumn()
    creado_en: Date;

    @OneToMany(() => Obra, (obra) => obra.usuario)
    obraCreados: Relation<Obra[]>;
}
