import { Controller, Post, Get, Body, Param, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from '../schemas/movie.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloud.service';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService, private cloudinaryService: CloudinaryService,) {}

  @Post('create')
  async create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.movieService.create(createMovieDto);
  }

  //obtener todas las pelis para cartelera asi que nos importa solo la imagen
  @Get('cartelera')
  async findAll(): Promise<Movie[]> {
    return this.movieService.getCartelera();
  }

  //obtener por id
  @Get('id/:id')
  async findById(@Param('id') id: string): Promise<Movie> {
    return this.movieService.findById(id);
  }

  //obtener por titulo, obtenemos toda la info de la peli
  @Get('title')
  async findByTitle(@Query('title') title: string): Promise<Movie> {
    return this.movieService.findByTitle(title);
  }

  //disponibles en cartelera
  @Get('in-cartelera')
  async findInCartelera(): Promise<Movie[]> {
    return this.movieService.findInCartelera();
  }

  //subir imagenes
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadMovieImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    const result = await this.cloudinaryService.uploadImage(file);
    const movie = await this.movieService.create({
      title: body.title,
      duration: body.duration,
      synopsis: body.synopsis,
      image: result.secure_url, // Aquí guardas la URL
      inCartelera: body.inCartelera,
    });

    return movie;
  }
  
}
