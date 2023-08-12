import { Injectable } from '@nestjs/common';
import { database } from 'src/main';
import { CreateArtistDto } from './dto/artist.dto';
import { checkItem, removeFromFavs, setIdToNull } from 'src/utils';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    return await this.prisma.artist.findMany({});
  }
  async addArtist(dto: CreateArtistDto) {
    const artist = await this.prisma.artist.create({
      data: {
        ...dto,
      },
    });
    return artist;
  }
  findOne(id) {
    return checkItem(id, database.artists);
  }
  deleteArtist(id) {
    checkItem(id, database.artists);
    database.artists = database.artists.filter(
      ({ id: artistId }) => artistId !== id,
    );
    setIdToNull(id, database.tracks, 'artistId');
    setIdToNull(id, database.albums, 'artistId');
    removeFromFavs(id, 'artists');
  }
  async updateArtist(id, dto) {
    const artist = await checkItem(id, database.artists);
    artist.grammy = dto.grammy;
    artist.name = dto.name;
    return artist;
  }
}
