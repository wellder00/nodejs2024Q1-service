import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}
  async createTrack(createTrackDto: CreateTrackDto) {
    return await this.prisma.track.create({ data: createTrackDto });
  }

  async findAllTracks() {
    return await this.prisma.track.findMany();
  }

  async findOneTrack(id: string) {
    const currentTrack = await this.prisma.track.findUnique({
      where: { id },
    });
    if (!currentTrack) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    return currentTrack;
  }

  async updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    try {
      return await this.prisma.track.update({
        where: { id },
        data: updateTrackDto,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Track with id ${id} not found`);
      }
      throw error;
    }
  }

  async removeTrack(id: string) {
    try {
      return await this.prisma.track.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Track with id ${id} not found`);
      }
      throw error;
    }
  }
}
