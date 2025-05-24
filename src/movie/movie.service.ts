import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Movie } from '../schemas/movie.schema';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MovieService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const existing = await this.movieModel.findOne({
      title: createMovieDto.title,
    });

    if (existing) {
      throw new BadRequestException('La película ya existe.');
    }

    const movie = new this.movieModel(createMovieDto);
    return movie.save();
  }

  async findAll(): Promise<Movie[]> {
    return this.movieModel.find().exec();
  }

  async findById(id: string): Promise<Movie> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID inválido');
    }

    const movie = await this.movieModel.findById(id);
    if (!movie) {
      throw new NotFoundException('Película no encontrada');
    }

    return movie;
  }

  async findByTitle(title: string): Promise<Movie> {
    const movie = await this.movieModel.findOne({ title });

    if (!movie) {
      throw new NotFoundException('Película no encontrada con ese título');
    }

    return movie;
  }

  async findInCartelera(): Promise<Movie[]> {
    return this.movieModel.find({ inCartelera: true }).exec();
  }
}
