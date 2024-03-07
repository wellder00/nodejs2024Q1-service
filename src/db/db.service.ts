import { Injectable } from '@nestjs/common';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Favorites } from 'src/favorite/interface/favorites.interface';
import { Track } from 'src/track/entities/track.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { DbEntities } from './types/db.interface';

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
    const entities = this[entityType];
    const matchingEntity = entities.find((entity) => entity.id === entityId);
    return matchingEntity ? true : false;
  }
}
