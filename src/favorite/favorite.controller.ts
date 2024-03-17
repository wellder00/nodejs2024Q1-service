import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post(':type/:id')
  async createFavorite(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Param('type') type: 'artist' | 'album' | 'track',
  ) {
    return await this.favoriteService.createFavorite(id, type);
  }

  @Get()
  async findAllFavorites() {
    return await this.favoriteService.findAllFavorites();
  }

  @Delete(':type/:id')
  @HttpCode(204)
  async remove(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Param('type') type: 'artist' | 'album' | 'track',
  ) {
    return await this.favoriteService.removeType(id, type);
  }
}
