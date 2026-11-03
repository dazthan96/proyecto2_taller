import { IsNotEmpty, IsSemVer, IsString, Length } from "class-validator";

export class UpdatePAsswordDTO{
    @IsNotEmpty()
    @IsString()
    @Length(6.255)
    nueva_contrasenia:string;
}