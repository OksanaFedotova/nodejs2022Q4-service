import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { FavouritesModule } from './favourites/favourites.module';

@Module({
  imports: [
    UserModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavouritesModule,
  ],
})
export class AppModule {}
