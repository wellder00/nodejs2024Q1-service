import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}
  async createAlbum(createAlbumDto: CreateAlbumDto) {
    return await this.prisma.album.create({ data: createAlbumDto });
  }

  async findAllAlbums() {
    return await this.prisma.album.findMany();
  }

  async findOneAlbum(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    return album;
  }

  async updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto) {
    try {
      return await this.prisma.album.update({
        where: { id },
        data: updateAlbumDto,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Album with id ${id} not found`);
      }
      throw error;
    }
  }

  async removeAlbum(id: string) {
    try {
      return await this.prisma.album.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Album with id ${id} not found`);
      }
      throw error;
    }
  }
}
