import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from 'src/album/dto/album.dto';
import { checkItem } from 'src/utils';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    return await this.prisma.album.findMany({});
  }
  async addAlbum(dto: CreateAlbumDto) {
    const album = await this.prisma.album.create({
      data: {
        ...dto,
      },
    });
    return album;
  }
  findOne(id) {
    return checkItem(id, this.prisma.album);
  }
  async deleteAlbum(id) {
    await checkItem(id, this.prisma.album);
    await this.prisma.album.delete({
      where: {
        id,
      },
    });
    // setIdToNull(id, this.prisma.tracks, 'albumId');
    // removeFromFavs(id, 'albums');
  }
  async updateAlbum(id: string, dto: CreateAlbumDto) {
    const album = await checkItem(id, this.prisma.album);
    album.name = dto.name;
    album.artistId = dto.artistId;
    album.year = dto.year;
    return album;
  }
}
