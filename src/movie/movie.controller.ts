import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from '../schemas/movie.schema';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  async create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.movieService.create(createMovieDto);
  }

  //obtener todas las pelis
  @Get()
  async findAll(): Promise<Movie[]> {
    return this.movieService.findAll();
  }

  //obtener por id
  @Get('id/:id')
  async findById(@Param('id') id: string): Promise<Movie> {
    return this.movieService.findById(id);
  }

  //obtener por titulo
  @Get('title')
  async findByTitle(@Query('title') title: string): Promise<Movie> {
    return this.movieService.findByTitle(title);
  }

  //disponibles en cartelera
  @Get('in-cartelera')
  async findInCartelera(): Promise<Movie[]> {
    return this.movieService.findInCartelera();
  }
}
