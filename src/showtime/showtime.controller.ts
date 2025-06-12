import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ShowtimeService } from './showtime.service';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { Showtime } from '../schemas/showtime.schema';

@Controller('showtimes')
export class ShowtimeController {
  constructor(private readonly showtimeService: ShowtimeService) {}

  @Post('create')
  create(@Body() dto: CreateShowtimeDto): Promise<Showtime> {
    return this.showtimeService.create(dto);
  }

  @Post('auto-create')
  autoCreateShowtimes(): Promise<Showtime[]> {
    return this.showtimeService.autoCreateShowtimes();
  }

  @Get()
  findAll(): Promise<Showtime[]> {
    return this.showtimeService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Showtime> {
    return this.showtimeService.findById(id);
  }

  @Get('movie/:movieId')
  findShowtimeByMovieId(
    @Param('movieId') movieId: string,
  ): Promise<Showtime[]> {
    return this.showtimeService.findShowtimeByMovieId(movieId);
  }

  @Get('available-dates/:movieId')
  getAvailableDates(@Param('movieId') movieId: string): Promise<string[]> {
    return this.showtimeService.getAvailableDatesByMovie(movieId);
  }
}
