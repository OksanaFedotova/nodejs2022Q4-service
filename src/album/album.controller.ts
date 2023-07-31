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
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiCreatedResponse,
  ApiBody,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiTags('Album')
@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}
  @Get()
  @ApiOperation({ summary: 'Get all albums' })
  @ApiOkResponse({ type: '', description: '' })
  @ApiBadRequestResponse({ description: '' })
  findAll() {
    return this.albumService.findAll();
  }
  @Post()
  @ApiOperation({ summary: 'Creates a new user' })
  @ApiBody({
    description: "The user's login and the user's password",
    type: '',
  })
  @ApiCreatedResponse({ type: '', description: '' })
  @ApiBadRequestResponse({ description: '' })
  addAlbum(@Body() dto: CreateAlbumDto) {
    return this.albumService.addalbum(dto);
  }
  @Get(':id')
  @ApiOperation({ summary: 'Get single album by id' })
  @ApiOkResponse({ type: '', description: 'Created Succesfully' })
  @ApiParam({ name: 'id', required: true, description: 'uuid v4' })
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
