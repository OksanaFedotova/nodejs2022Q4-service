import { Injectable } from '@nestjs/common';
import { database } from 'src/main';
import { randomUUID } from 'node:crypto';
import { CreateTrackDto } from './dto/track.dto';
import { checkItem, removeFromFavs } from 'src/utils';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    return await this.prisma.track.findMany({});
  }
  addTrack(dto: CreateTrackDto) {
    const uuid = randomUUID();
    const track = {
      ...dto,
      id: uuid,
    };
    database.tracks.push(track);
    return track;
  }
  findOne(id) {
    return checkItem(id, database.tracks);
  }
  deleteTrack(id) {
    checkItem(id, database.tracks);
    database.tracks = database.tracks.filter(
      ({ id: trackId }) => trackId !== id,
    );
    removeFromFavs(id, 'tracks');
  }
  async updateTrack(id, dto) {
    let track = await checkItem(id, database.tracks);
    track = {
      ...track,
      dto,
    };
    return track;
  }
}
