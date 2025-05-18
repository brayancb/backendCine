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

  async create(registerDTO: RegisterDTO) {
    // Verifica si el usuario ya existe por email
    const existingUser = await this.userService.findByEmail(registerDTO.email);
    if (existingUser) {
      throw new BadRequestException('El correo ya está registrado');
    }

    // Hashea la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(registerDTO.password, 10);

    // Crea el usuario usando el UserService
    const user = await this.userService.create({
      ...registerDTO,
      password: hashedPassword,
    });

    // Opcional: genera un token JWT al registrar
    const payload = { sub: user._id, email: user.email };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Usuario registrado exitosamente',
      access_token: token,
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
      },
    };
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
