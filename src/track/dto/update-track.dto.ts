import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';
import {
  IsString,
  IsNotEmpty,
  ValidateIf,
  IsUUID,
  IsInt,
} from 'class-validator';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @IsString({ message: 'Field "name" must be a string' })
  @IsNotEmpty({ message: 'Field "name" cannot be empty' })
  name: string;

  @ValidateIf((o) => o.artistId !== null)
  @IsString({ message: 'Field "artistId" must be a string or null' })
  @IsUUID('4', {
    message: 'Field "artistId" must be a valid UUID v4 string',
    each: true,
  })
  artistId: string | null;

  @ValidateIf((o) => o.albumId !== null)
  @IsString({ message: 'Field "albumId" must be a string or null' })
  @IsUUID('4', {
    message: 'Field "albumId" must be a valid UUID v4 string',
    each: true,
  })
  albumId: string | null;

  @IsInt({ message: 'Field "duration" must be an integer' })
  duration: number;
}
