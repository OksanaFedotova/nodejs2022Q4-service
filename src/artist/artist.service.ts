import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/artist.dto';
import { checkItem } from 'src/utils';
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
  async findOne(id) {
    return await checkItem(id, this.prisma.artist);
  }
  async deleteArtist(id) {
    await checkItem(id, this.prisma.artist);
    this.prisma.artist.delete({
      where: {
        id,
      },
    });
    // setIdToNull(id, database.tracks, 'artistId');
    // setIdToNull(id, database.albums, 'artistId');
    // removeFromFavs(id, 'artists');
  }
  async updateArtist(id, dto) {
    const artist = await checkItem(id, this.prisma.artist);
    artist.grammy = dto.grammy;
    artist.name = dto.name;
    return artist;
  }
}
