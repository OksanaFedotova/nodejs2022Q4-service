import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/track.dto';
import { checkItem } from 'src/utils';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    return await this.prisma.track.findMany({});
  }
  async addTrack(dto: CreateTrackDto) {
    const track = await this.prisma.track.create({
      data: {
        ...dto,
      },
    });
    return track;
  }
  async findOne(id) {
    return await checkItem(id, this.prisma.track);
  }

  async deleteTrack(id) {
    await checkItem(id, this.prisma.track);
    await this.prisma.track.delete({
      where: {
        id,
      },
    });
  }
  async updateTrack(id, dto) {
    await checkItem(id, this.prisma.track);
    return this.prisma.track.update({ where: { id }, data: dto });
  }
}
