import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterDTO } from './dto/register.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  create(@Body() RegisterDTO: RegisterDTO) {
    return this.authenticationService.create(RegisterDTO);
  }

}
