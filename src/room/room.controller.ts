import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { RoomService } from './room.service';
import { Room } from '../schemas/room.schema';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('create')
  create(@Body() body: Partial<Room>): Promise<Room> {
    return this.roomService.create(body);
  }

  @Get()
  findAll(): Promise<Room[]> {
    return this.roomService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Room> {
    const room = await this.roomService.findById(id);
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    return room;
  }

  @Post(':id/seats')
  updateSeat(
    @Param('id') id: string,
    @Body() body: { row: number; column: number; occupied: boolean },
  ) {
    return this.roomService.updateSeatStatus(id, body.row, body.column, body.occupied);
  }
}
