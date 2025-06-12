import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Showtime, ShowtimeSchema } from '../schemas/showtime.schema';
import { ShowtimeController } from './showtime.controller';
import { ShowtimeService } from './showtime.service';
import { RoomModule } from 'src/room/room.module';
import { MovieModule } from 'src/movie/movie.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Showtime.name, schema: ShowtimeSchema },
    ]),
    RoomModule,
    MovieModule,
  ],
  controllers: [ShowtimeController],
  providers: [ShowtimeService],
})
export class ShowtimeModule {}
