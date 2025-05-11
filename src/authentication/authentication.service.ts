import { Injectable } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
//import { UpdateAuthenticationDto } from './dto/update-authentication.dto';

@Injectable()
export class AuthenticationService {
  create(RegisterDTO: RegisterDTO) {
    return 'This action adds a new authentication';
  }
  login(loginDto: LoginDto) {
    // Aquí puedes agregar la lógica real luego (comparar con base de datos, etc.)
    return `Usuario intentó iniciar sesión con: ${loginDto.email}`;
  }
}
