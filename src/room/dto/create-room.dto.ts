import { IsInt, IsString, Min, IsNotEmpty } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(1)
  capacity: number;

  @IsInt()
  @Min(1)
  rows: number;

  @IsInt()
  @Min(1)
  columns: number;
}
