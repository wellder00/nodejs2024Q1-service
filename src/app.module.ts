import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DbModule } from './db/db.module';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { FavoriteModule } from './favorite/favorite.module';
import { TrackModule } from './track/track.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    UserModule,
    DbModule,
    AlbumModule,
    ArtistModule,
    FavoriteModule,
    TrackModule,
    PrismaModule,
  ],
})
export class AppModule {}
