import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from '../schemas/movie.schema';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
  ],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
