import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Seat, SeatSchema } from './seat.schema';
import { Document } from 'mongoose';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  capacity: number;

  @Prop({ required: true })
  rows: number;

  @Prop({ required: true })
  columns: number;

  @Prop({ type: [[SeatSchema]], default: [] })  // array de arrays de Seat
  seats: Seat[][];
}

export const RoomSchema = SchemaFactory.createForClass(Room);
