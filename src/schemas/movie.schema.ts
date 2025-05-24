import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Movie extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true })
  synopsis: string;

  @Prop({ required: true })
  image: string;

  @Prop({ default: true })
  inCartelera: boolean;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
