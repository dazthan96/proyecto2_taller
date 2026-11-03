import { IsIn, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateAutoreDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    nombre_completo:string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    biografia:string;

    @IsString()
    @IsNotEmpty()
    @IsIn(['autor', 'recopilador', 'anonimo'],{message:"Tipo de autor no valido"})
    tipo:string
}