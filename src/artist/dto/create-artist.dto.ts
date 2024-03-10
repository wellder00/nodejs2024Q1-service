import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateArtistDto {
  @IsString({ message: 'The name must be a string.' })
  @IsNotEmpty({ message: 'The name cannot be empty.' })
  name: string;

  @IsBoolean({
    message: 'The Grammy status must be a boolean value (true or false).',
  })
  @IsNotEmpty({ message: 'The Grammy status cannot be empty.' })
  grammy: boolean;
}
