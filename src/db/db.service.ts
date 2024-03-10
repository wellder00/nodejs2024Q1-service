import { Injectable } from '@nestjs/common';
import { Favorites } from 'src/favorite/interface/favorites.interface';
import { UserEntity } from 'src/user/entities/user.entity';
import { DbEntities, Entities } from './types/db.interface';
import { Album } from 'src/album/interface/album.interface';
import { Artist } from 'src/artist/interface/artist.interface';
import { Track } from 'src/track/interface/track.interface';

@Injectable()
export class DbService {
  users: UserEntity[] = [];
  albums: Album[] = [];
  artists: Artist[] = [];
  tracks: Track[] = [];

  favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  verifyEntityPresence(entityId: string, entityType: DbEntities): boolean {
    const entities: Entities = this[entityType];
    const matchingEntity = entities.find((entity) => entity.id === entityId);
    return matchingEntity ? true : false;
  }
}
