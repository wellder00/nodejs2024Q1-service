import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { FavoriteModule } from './favorite/favorite.module';
import { TrackModule } from './track/track.module';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerModule } from './logger/logger.module';
import { JwtAuthMiddleware } from './utils/middlewares/jwtAuthMiddleware';
import { HttpRequestLoggerMiddleware } from './utils/middlewares/httpRequestLoggerMiddleware';
import { CoreModule } from './utils/modules/coreModule';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    CoreModule,
    UserModule,
    AlbumModule,
    ArtistModule,
    FavoriteModule,
    TrackModule,
    PrismaModule,
    LoggerModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HttpRequestLoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
    // consumer
    //   .apply(JwtAuthMiddleware)
    //   .exclude(
    //     { path: 'auth/signup', method: RequestMethod.ALL },
    //     { path: 'auth/login', method: RequestMethod.ALL },
    //     { path: 'doc', method: RequestMethod.ALL },
    //     { path: '/', method: RequestMethod.ALL },
    //   )
    //   .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
