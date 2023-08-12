import { Injectable } from '@nestjs/common';
import { database } from 'src/main';
import { PrismaService } from 'src/prisma/prisma.service';
import { checkItem } from 'src/utils';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    return await this.prisma.favorites.findMany({});
  }
  addFavorite(id: string, type: string) {
    const item = checkItem(id, database[`${type}s`], 422);
    database.favorites[`${type}s`].push(item);
  }

  deleteFavorite(id: string, type: string) {
    checkItem(id, database[`${type}s`], 422);
    database.favorites[`${type}s`] = database.favorites[`${type}s`].filter(
      ({ id: itemId }) => {
        return itemId !== id;
      },
    );
  }
}
