import { ArrayNotEmpty, IsArray, IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Role } from "src/roles/interfaces/role.interface";

export class RegisterAuthDto {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  surname: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener minimo 6 caracteres' })
  password: string;

  @ArrayNotEmpty()
  @IsArray()
  @IsEnum(Role, { each: true })
  rolesTypes: Role[];
}
