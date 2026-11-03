import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateObraDto {
    @IsString()
    @IsNotEmpty()
    titulo:string;

    @IsString()
    @IsNotEmpty()
    sinopsis:string;

    @IsOptional()
    @Transform(({value})=>Number(value))
    @IsNumber()
    @Min(1900)
    anio_publicacion:number;

    @IsString()
    @IsNotEmpty()
    departamento:string;

    @IsString()
    @IsNotEmpty()
    autor:string;

    @IsString()
    @IsNotEmpty()
    region:string;

    @IsString()
    @IsNotEmpty()
    cultura:string;

    @IsString()
    @IsNotEmpty()
    categoria:string;

    @IsString()
    @IsNotEmpty()
    usuario:string;
}