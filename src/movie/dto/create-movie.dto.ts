import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  duration: number;

  @IsString()
  synopsis: string;

  @IsString()
  image: string;

  @IsBoolean()
  @IsOptional()
  inCartelera: boolean;
}
