import { Artist } from '../interface/artist.interface';
import { v4 as uuid4 } from 'uuid';

export class ArtistEntity implements Artist {
  id: string;
  name: string;
  grammy: boolean;

  constructor({ name, grammy }: Partial<ArtistEntity>) {
    this.id = uuid4();
    this.name = name;
    this.grammy = grammy;
  }
}
