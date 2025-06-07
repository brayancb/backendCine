import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Room, RoomDocument } from '../schemas/room.schema';
import { Model } from 'mongoose';
import { Seat } from 'src/schemas/seat.schema';

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) {}

  async create(roomData: Partial<Room>): Promise<Room> {
    const { rows, columns } = roomData;

    if (rows == null || columns == null) {
      throw new Error('rows and columns are required');
    }

    // Crear matriz de asientos vacíos
    const seats: Seat[][] = [];

    for (let r = 0; r < rows; r++) {
      const rowSeats: Seat[] = [];
      for (let c = 0; c < columns; c++) {
        rowSeats.push({ row: r, column: c, occupied: false });
      }
      seats.push(rowSeats);
    }

    const roomToCreate = {
      ...roomData,
      seats,
    };

    return this.roomModel.create(roomToCreate);
  }

  async findAll(): Promise<Room[]> {
    return this.roomModel.find();
  }

  async findById(id: string): Promise<Room> {
    const room = await this.roomModel.findById(id);
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    return room;
  }

  async updateSeatStatus(roomId: string, row: number, column: number, occupied: boolean): Promise<Room> {
    const room = await this.roomModel.findById(roomId);
    if (!room) {
      throw new NotFoundException('Room not found');
    }

    if (!room.seats?.[row]?.[column]) {
      throw new NotFoundException('Seat not found');
    }

    room.seats[row][column].occupied = occupied;

    await room.save();
    return room;
  }
}
