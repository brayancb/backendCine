import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
//import { UpdateAuthenticationDto } from './dto/update-authentication.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  create(RegisterDTO: RegisterDTO) {
    return 'This action adds a new authentication';
  }
  
  async login(loginDto: LoginDto) {
    if (!loginDto || !loginDto.email || !loginDto.password) {
      throw new BadRequestException('Email y contraseña son requeridos');
    }

    const { email, password } = loginDto;

    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: user._id, email: user.email };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Inicio de sesión exitoso',
      access_token: token,
    };
  }
}
