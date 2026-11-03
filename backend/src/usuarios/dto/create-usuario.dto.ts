import { Column, CreateDateColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Obra } from "../../obras/entities/obra.entity.js";
import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, MaxLength } from "class-validator";

export class CreateUsuarioDto {
    @IsNumber()
    @IsNotEmpty()
    id:number;

    @IsEmail()
    @IsNotEmpty()
    correo:string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    nombre_completo:string;
    
    @IsString()
    @IsNotEmpty()
    @Length(6,255)
    contrasena: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    rol:string
}
