import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
export class RegisterDTO {
    @IsNotEmpty()
    @IsString()
    username: string;
    @IsString()
    @IsNotEmpty()
    password: string;
    @IsEmail()
    @IsNotEmpty()
    email: string;
}

