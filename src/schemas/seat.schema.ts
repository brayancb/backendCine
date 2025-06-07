import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Seat {
  @Prop({ required: true })
  row: number;

  @Prop({ required: true })
  column: number;

  @Prop({ default: false })
  occupied: boolean;
}

export const SeatSchema = SchemaFactory.createForClass(Seat);
