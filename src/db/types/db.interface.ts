import { Album } from 'src/album/interface/album.interface';
import { Artist } from 'src/artist/interface/artist.interface';
import { Track } from 'src/track/interface/track.interface';
import { UserEntity } from 'src/user/entities/user.entity';

export const enum DbEntities {
  USERS = 'users',
  TRACKS = 'tracks',
  ARTISTS = 'artists',
  ALBUMS = 'albums',
}

export type Entities = (UserEntity | Track | Artist | Album)[];
