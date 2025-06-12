import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ShowtimeDocument = Showtime & Document;

@Schema({ timestamps: true })
export class Showtime {
  @Prop({ type: Types.ObjectId, ref: 'Movie', required: true })
  movie: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Room', required: true })
  room: Types.ObjectId;

  @Prop({ required: true })
  roomName: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  time: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  projectionType: string;

  @Prop()
  language?: string;
}

export const ShowtimeSchema = SchemaFactory.createForClass(Showtime);
