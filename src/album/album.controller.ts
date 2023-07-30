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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/album.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Album')
@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}
  @Get()
  findAll() {
    return this.albumService.findAll();
  }
  @Post()
  addalbum(@Body() dto: CreateAlbumDto) {
    return this.albumService.addalbum(dto);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    const album = this.albumService.findOne(id);
    return album;
  }
  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param('id') id: string) {
    return this.albumService.deleteAlbum(id);
  }
  @Put(':id')
  updateAlbum(@Param('id') id: string, @Body() dto: CreateAlbumDto) {
    return this.albumService.updateAlbum(id, dto);
  }
}
