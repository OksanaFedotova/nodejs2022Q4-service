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
    await this.prisma.artist.delete({
      where: {
        id,
      },
    });
  }
  async updateArtist(id, dto) {
    await checkItem(id, this.prisma.artist);
    return await this.prisma.artist.update({ where: { id }, data: dto });
  }
}
