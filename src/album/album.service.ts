import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { DbService } from 'src/db/db.service';
import { AlbumEntity } from './entities/album.entity';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Track } from 'src/track/interface/track.interface';
import { DbEntities } from 'src/db/types/db.interface';

@Injectable()
export class AlbumService {
  constructor(private db: DbService) {}
  async createAlbum(createAlbumDto: CreateAlbumDto) {
    const conditionArtist = this.db.verifyEntityPresence(
      createAlbumDto.artistId,
      DbEntities.ARTISTS,
    );
    if (conditionArtist && createAlbumDto.artistId) {
      throw new NotFoundException(
        `Artist with ID ${createAlbumDto.artistId} not found`,
      );
    }
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
    const conditionArtist = this.db.verifyEntityPresence(
      updateAlbumDto.artistId,
      DbEntities.ARTISTS,
    );
    if (conditionArtist && updateAlbumDto.artistId) {
      throw new NotFoundException(
        `Artist with ID ${updateAlbumDto.artistId} not found`,
      );
    }
    currentAlbum.artistId = updateAlbumDto.artistId;
    currentAlbum.name = updateAlbumDto.name;
    currentAlbum.year = updateAlbumDto.year;
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
