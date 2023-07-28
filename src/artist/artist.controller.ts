import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateArtistDto } from 'src/artist/dto/artist.dto';
import { ArtistService } from 'src/artist/artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}
  @Get()
  findAll() {
    return this.artistService.findAll();
  }
  @Post()
  addartist(@Body() dto: CreateArtistDto) {
    return this.artistService.addArtist(dto);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    const artist = this.artistService.findOne(id);
    return artist;
  }
  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param('id') id: string) {
    return this.artistService.deleteArtist(id);
  }
  @Put(':id')
  updateArtist(@Param('id') id: string, @Body() dto: CreateArtistDto) {
    return this.artistService.updateArtist(id, dto);
  }
}
