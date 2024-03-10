import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DbService } from 'src/db/db.service';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(private db: DbService) {}

  async createArtist(createArtistDto: CreateArtistDto): Promise<ArtistEntity> {
    const newArtist = new ArtistEntity(createArtistDto);
    // TODO: add "await" when implemented in DB
    this.db.artists.push(newArtist);
    return newArtist;
  }
  async findAllArtists() {
    return this.db.artists;
  }

  async findOneArtist(id: string) {
    const currentArtist = this.db.artists.find((artist) => artist.id === id);
    if (!currentArtist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    return currentArtist;
  }

  async updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    const currentArtist = await this.findOneArtist(id);

    currentArtist.name = updateArtistDto.name;
    currentArtist.grammy = updateArtistDto.grammy;

    return currentArtist;
  }

  async removeArtist(id: string) {
    const artistExists = this.db.artists.some((artist) => artist.id === id);
    if (!artistExists) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }

    this.db.tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });

    this.db.albums.forEach((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });

    this.db.favorites.artists = this.db.favorites.artists.filter(
      (storedId) => storedId !== id,
    );

    this.db.artists = this.db.artists.filter((artist) => artist.id !== id);
  }
}
