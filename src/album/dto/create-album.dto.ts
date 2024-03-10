import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString({ message: 'Name must be a string.' })
  @IsNotEmpty({ message: 'Name is required.' })
  name: string;

  @IsInt({ message: 'Year must be an integer.' })
  year: number;

  @ValidateIf((o) => o.artistId !== null)
  @IsUUID('4', { message: 'Artist ID must be a valid UUID v4 string.' })
  artistId: string | null;
}
