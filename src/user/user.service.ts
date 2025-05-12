import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel : Model<User>) {}
  
  create(createUserDto: CreateUserDto) {
    try{
    return this.userModel.create(createUserDto); //crea el user y lo guarda en la base de datos
    }catch(e){
      console.log(e);//si hay un error lo imprime en la consola
      return e;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
