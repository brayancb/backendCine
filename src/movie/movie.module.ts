import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from '../schemas/movie.schema';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { CloudinaryModule } from 'src/cloudinary/cloud.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
    CloudinaryModule,
  ],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
