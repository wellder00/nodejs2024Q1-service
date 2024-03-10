import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService],
  imports: [DbModule],
})
export class FavoriteModule {}
