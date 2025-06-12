import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Showtime, ShowtimeDocument } from '../schemas/showtime.schema';
import { Model, Types } from 'mongoose';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { RoomService } from 'src/room/room.service';
import * as moment from 'moment';
import { MovieService } from 'src/movie/movie.service';
import { Movie } from 'src/schemas/movie.schema';

@Injectable()
export class ShowtimeService {
  constructor(
    @InjectModel(Showtime.name) private showtimeModel: Model<ShowtimeDocument>,
    private readonly roomService: RoomService,
    private readonly movieService: MovieService,
  ) {}

  async create(dto: CreateShowtimeDto): Promise<Showtime> {
    // Creamos la sala con 5 filas x 8 columnas
    const createdRoom = await this.roomService.create({
      name: dto.roomName,
      capacity: 40,
      rows: 5,
      columns: 8,
    });

    const showtime = new this.showtimeModel({
      ...dto,
      movie: new Types.ObjectId(dto.movie),
      room: (createdRoom as any)._id,
    });

    return showtime.save();
  }

  async findAll(): Promise<Showtime[]> {
    return this.showtimeModel.find();
  }

  async findById(id: string): Promise<Showtime> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('El ID proporcionado no es válido');
    }

    const showtime = await this.showtimeModel
      .findById(id)
      //.populate('room movie')
      .lean<Showtime>()
      .exec();

    if (!showtime) {
      throw new NotFoundException('Función no encontrada');
    }

    return showtime;
  }

  async findShowtimeByMovieId(movieId: string): Promise<Showtime[]> {
    if (!Types.ObjectId.isValid(movieId)) {
      throw new NotFoundException('ID de película inválido');
    }

    const objectId = new Types.ObjectId(movieId);

    const showtimes = await this.showtimeModel
      .find({ movie: objectId })
      .lean<Showtime[]>()
      .exec();

    const now = moment();

    const disponibles = showtimes.filter((s) => {
      const fechaYHora = moment(`${s.date} ${s.time}`, 'YYYY-MM-DD HH:mm');
      return fechaYHora.isValid() && fechaYHora.isAfter(now);
    });

    if (disponibles.length === 0) {
      throw new NotFoundException(
        'No hay funciones disponibles para esta película',
      );
    }

    return disponibles;
  }

  //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  async autoCreateShowtimes(): Promise<Showtime[]> {
    const salas = ['Sala 1', 'Sala 2', 'Sala 3', 'Sala 4', 'Sala 5'];

    const horarios: string[] = [];
    for (let h = 10; h <= 21; h += 3) {
      horarios.push(`${h.toString().padStart(2, '0')}:00`);
    }

    const diasACrear = 4;
    const peliculas: Movie[] = await this.movieService.findInCartelera();
    if (!peliculas.length) {
      throw new NotFoundException('No hay películas disponibles');
    }

    const idiomas = ['subtitulada', 'español'];
    const tiposProyeccion = ['2D', '3D', '4DX'];
    const precios = {
      '2D': 4000,
      '3D': 5500,
      '4DX': 7000,
    };

    const showtimes: Showtime[] = [];
    let movieIndex = 0;
    let idiomaIndex = 0;
    let proyeccionIndex = 0;

    for (let d = 0; d < diasACrear; d++) {
      const date = moment()
        .add(d + 1, 'day')
        .format('YYYY-MM-DD');

      for (const sala of salas) {
        for (const hora of horarios) {
          const pelicula = peliculas[movieIndex % peliculas.length];
          const language = idiomas[idiomaIndex % idiomas.length];
          const projectionType =
            tiposProyeccion[proyeccionIndex % tiposProyeccion.length];
          const price = precios[projectionType];

          const createdRoom = await this.roomService.create({
            name: sala,
            capacity: 40,
            rows: 5,
            columns: 8,
          });

          const showtime = await this.showtimeModel.create({
            movie: new Types.ObjectId(pelicula._id as string),
            room: (createdRoom as any)._id,
            roomName: sala,
            date: date,
            time: hora,
            price,
            projectionType,
            language,
          });

          showtimes.push(showtime);
          movieIndex++;
          idiomaIndex++;
          proyeccionIndex++;
        }
      }
    }

    return showtimes;
  }

  //======================================================================================================
  async getAvailableDatesByMovie(movieId: string): Promise<string[]> {
    if (!Types.ObjectId.isValid(movieId)) {
      throw new NotFoundException('ID de película inválido');
    }

    const objectId = new Types.ObjectId(movieId);

    const showtimes = await this.showtimeModel
      .find({ movie: objectId })
      .lean<Showtime[]>()
      .exec();

    if (!showtimes.length) {
      throw new NotFoundException('No hay funciones para esta película');
    }

    const now = moment();

    const fechasUnicas = Array.from(
      new Set(
        showtimes
          .filter((s) =>
            moment(`${s.date} ${s.time}`, 'YYYY-MM-DD HH:mm').isAfter(now),
          )
          .map((s) => s.date),
      ),
    );

    return fechasUnicas.sort();
  }
}
