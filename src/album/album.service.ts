import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { DbService } from 'src/db/db.service';
import { AlbumEntity } from './entities/album.entity';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Track } from 'src/track/interface/track.interface';

@Injectable()
export class AlbumService {
  constructor(private db: DbService) {}
  async createAlbum(createAlbumDto: CreateAlbumDto) {
    const newAlbum = new AlbumEntity(createAlbumDto);
    this.db.albums.push(newAlbum);
    return newAlbum;
  }

  async findAllAlbums() {
    return this.db.albums;
  }

  async findOneAlbum(id: string) {
    const currentAlbum = this.db.albums.find((album) => album.id === id);
    if (!currentAlbum) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    return currentAlbum;
  }

  async updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto) {
    const currentAlbum = await this.findOneAlbum(id);
    currentAlbum.artistId = updateAlbumDto.artistId || currentAlbum.artistId;
    currentAlbum.name = updateAlbumDto.name || currentAlbum.name;
    currentAlbum.year = updateAlbumDto.year || currentAlbum.year;
    return currentAlbum;
  }

  async removeAlbum(id: string) {
    const currentAlbum = await this.findOneAlbum(id);
    const index = this.db.albums.findIndex((u) => u.id === currentAlbum.id);
    this.db.tracks.forEach((track: Track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });

    this.db.favorites.albums = this.db.favorites.albums.filter(
      (albumsId: string) => albumsId !== id,
    );

    if (index !== -1) {
      this.db.albums.splice(index, 1);
    }
  }
}
