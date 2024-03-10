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
  createFavorite(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Param('type') type: string,
  ) {
    return this.favoriteService.createFavorite(id, type);
  }

  @Get()
  findAllFavorites() {
    return this.favoriteService.findAllFavorites();
  }

  @Delete(':type/:id')
  @HttpCode(204)
  remove(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Param('type') type: string,
  ) {
    return this.favoriteService.removeType(id, type);
  }
}
