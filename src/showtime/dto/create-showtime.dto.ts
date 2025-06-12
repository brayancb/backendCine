import {
  IsNotEmpty,
  IsString,
  IsMongoId,
  IsDateString,
  IsNumber,
} from 'class-validator';

export class CreateShowtimeDto {
  @IsMongoId()
  @IsNotEmpty()
  movie: string;

  @IsString()
  @IsNotEmpty()
  roomName: string; // nombre de la sala

  @IsDateString()
  @IsNotEmpty()
  date: string; // "2025-06-10"

  @IsString()
  @IsNotEmpty()
  time: string; // "20:30"

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  projectionType: string;

  @IsString()
  language?: string;
}
