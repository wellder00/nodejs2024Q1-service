import { v4 as uuid4 } from 'uuid';
import { Album } from '../interface/album.interface';

export class AlbumEntity implements Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;

  constructor({ name, year, artistId }: Partial<AlbumEntity>) {
    this.id = uuid4();
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  }
}
