import { Injectable } from '@nestjs/common';
import { database } from 'src/main';
import { CreateAlbumDto } from 'src/album/dto/album.dto';
import { checkItem, removeFromFavs, setIdToNull } from 'src/utils';
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
    return checkItem(id, database.albums);
  }
  deleteAlbum(id) {
    checkItem(id, database.albums);
    database.albums = database.albums.filter(
      ({ id: albumId }) => albumId !== id,
    );
    setIdToNull(id, database.tracks, 'albumId');
    removeFromFavs(id, 'albums');
  }
  async updateAlbum(id: string, dto: CreateAlbumDto) {
    const album = await checkItem(id, database.albums);
    album.name = dto.name;
    album.artistId = dto.artistId;
    album.year = dto.year;
    return album;
  }
}
