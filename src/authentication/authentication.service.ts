import { Injectable } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
//import { UpdateAuthenticationDto } from './dto/update-authentication.dto';

@Injectable()
export class AuthenticationService {
  create(RegisterDTO: RegisterDTO) {
    return 'This action adds a new authentication';
  }
}
