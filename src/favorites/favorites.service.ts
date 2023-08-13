import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { checkItem } from 'src/utils';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    return await this.prisma.favorites.findMany({});
  }
  async addFavorite(id: string, type: string) {
    const item = await checkItem(id, this.prisma[`${type}`], 422);
    this.prisma.favorites.update({
      where: { id: 1 },
      data: {
        [`${type}`]: {
          push: item,
        },
      },
    });
  }

  //   deleteFavorite(id: string, type: string) {
  //     checkItem(id, this.prisma[`${type}`][`${type}s`], 422);
  //     database.favorites[`${type}s`] = database.favorites[`${type}s`].filter(
  //       ({ id: itemId }) => {
  //         return itemId !== id;
  //       },
  //     );
  //   }
}
