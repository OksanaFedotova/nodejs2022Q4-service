import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiCreatedResponse,
  ApiBody,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all favorites' })
  @ApiOkResponse({ type: '', description: '' })
  @ApiBadRequestResponse({ description: '' })
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post(':type/:id')
  @ApiOperation({ summary: 'Creates a new user' })
  @ApiBody({
    description: "The user's login and the user's password",
    type: '',
  })
  @ApiParam({ name: 'type', required: true, description: 'uuid v4' })
  @ApiParam({ name: 'type', required: true, description: 'uuid v4' })
  @ApiCreatedResponse({ type: '', description: '' })
  @ApiBadRequestResponse({ description: '' })
  addFavorite(@Param('type') type: string, @Param('id') id: string) {
    return this.favoritesService.addFavorite(id, type);
  }

  @Delete(':type/:id')
  @ApiOperation({ summary: 'Deletes user by ID' })
  @ApiNoContentResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiParam({ name: 'id', required: true, description: 'uuid v4' })
  @ApiParam({ name: 'type', required: true, description: 'uuid v4' })
  @HttpCode(204)
  deleteFavorite(@Param('type') type: string, @Param('id') id: string) {
    return this.favoritesService.deleteFavorite(id, type);
  }
}
