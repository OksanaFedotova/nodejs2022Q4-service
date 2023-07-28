import { Injectable } from '@nestjs/common';
import { database } from 'src/main';
import { CreateArtistDto } from './dto/artist.dto';
import { randomUUID } from 'node:crypto';
import { checkItem } from 'src/utils';

@Injectable()
export class ArtistService {
  findAll() {
    return database.artists;
  }
  addArtist(dto: CreateArtistDto) {
    const uuid = randomUUID();
    const artist = {
      ...dto,
      id: uuid,
    };
    database.artists.push(artist);
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
    database.tracks.forEach((track) =>
      track.artistId === id ? (track.artistId = null) : track.artistId,
    );
  }
  updateArtist(id, dto) {
    const artist = checkItem(id, database.artists);
    artist.grammy = dto.grammy;
    artist.name = dto.name;
    return artist;
  }
}
