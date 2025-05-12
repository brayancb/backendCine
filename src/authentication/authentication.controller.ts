import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  create(@Body() RegisterDTO: RegisterDTO) {
    return this.authenticationService.create(RegisterDTO);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    if (!loginDto || !loginDto.email || !loginDto.password) {
      throw new BadRequestException('Email y contraseña son requeridos');
    }
    return this.authenticationService.login(loginDto);
  }
}
