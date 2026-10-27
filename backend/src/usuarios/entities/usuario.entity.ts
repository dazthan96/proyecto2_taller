import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Obra } from "../../obras/entities/obra.entity.js";

@Entity('usuario')
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    correo: string;

    @Column()
    contrasena: string;

    @Column()
    nombre_completo: string;

    @Column({ type: 'enum', enum: ['ADMINISTRADOR', 'EDITOR'] })
    rol: string;

    @Column({ default: true })
    esta_activo: boolean;

    @CreateDateColumn()
    creado_en: Date;

    @OneToMany(() => Obra, (obra) => obra.usuario)
    obraCreados: Obra[];
}
