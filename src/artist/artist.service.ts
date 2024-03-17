import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async createArtist(createArtistDto: CreateArtistDto) {
    return await this.prisma.artist.create({ data: createArtistDto });
  }
  async findAllArtists() {
    return await this.prisma.artist.findMany();
  }

  async findOneArtist(id: string) {
    const currentArtist = await this.prisma.artist.findUnique({
      where: { id },
    });
    if (!currentArtist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    return currentArtist;
  }

  async updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    try {
      return await this.prisma.artist.update({
        where: { id },
        data: updateArtistDto,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Artist with id ${id} not found`);
      }
      throw error;
    }
  }

  async removeArtist(id: string) {
    try {
      return await this.prisma.artist.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Artist with id ${id} not found`);
      }
      throw error;
    }
  }
}
