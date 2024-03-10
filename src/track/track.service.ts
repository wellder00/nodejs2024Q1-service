import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DbEntities } from 'src/db/types/db.interface';
import { DbService } from 'src/db/db.service';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(private db: DbService) {}
  createTrack(createTrackDto: CreateTrackDto) {
    const conditionAlbum = this.db.verifyEntityPresence(
      createTrackDto.artistId,
      DbEntities.ALBUMS,
    );
    if (conditionAlbum) {
      throw new NotFoundException(
        `Album with ID ${createTrackDto.artistId} not found`,
      );
    }

    const newTrack = new TrackEntity(createTrackDto);

    this.db.tracks.push(newTrack);
    return newTrack;
  }

  findAllTracks() {
    return this.db.tracks;
  }

  findOneTrack(id: string) {
    const currentTrack = this.db.tracks.find((track) => track.id === id);
    if (!currentTrack) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    return currentTrack;
  }

  updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    const currentTrack = this.findOneTrack(id);
    const conditionArtist = this.db.verifyEntityPresence(
      updateTrackDto.artistId,
      DbEntities.ARTISTS,
    );
    const conditionAlbum = this.db.verifyEntityPresence(
      updateTrackDto.artistId,
      DbEntities.ALBUMS,
    );
    if (conditionArtist) {
      throw new NotFoundException(
        `Artist with ID ${updateTrackDto.artistId} not found`,
      );
    }
    if (conditionAlbum) {
      throw new NotFoundException(
        `Album with ID ${updateTrackDto.artistId} not found`,
      );
    }

    currentTrack.albumId = updateTrackDto.albumId || currentTrack.albumId;
    currentTrack.artistId = updateTrackDto.artistId || currentTrack.artistId;
    currentTrack.duration = updateTrackDto.duration || currentTrack.duration;
    currentTrack.name = updateTrackDto.name || currentTrack.name;

    return currentTrack;
  }

  removeTrack(id: string) {
    const currentTrack = this.findOneTrack(id);
    this.db.favorites.tracks = this.db.favorites.tracks.filter(
      (trackID) => trackID !== currentTrack.id,
    );
    const index = this.db.tracks.findIndex((u) => u.id === currentTrack.id);
    if (index !== -1) {
      this.db.tracks.splice(index, 1);
    }
  }
}
