import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { FavoriteModule } from './favorite/favorite.module';
import { TrackModule } from './track/track.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    UserModule,
    AlbumModule,
    ArtistModule,
    FavoriteModule,
    TrackModule,
    PrismaModule,
  ],
})
export class AppModule {}
