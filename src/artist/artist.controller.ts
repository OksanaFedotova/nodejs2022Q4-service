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

@ApiTags('Artist')
@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}
  @Get()
  @ApiOperation({ summary: 'Get all artists' })
  @ApiOkResponse({ type: '', description: '' })
  @ApiBadRequestResponse({ description: '' })
  findAll() {
    return this.artistService.findAll();
  }
  @Post()
  @ApiOperation({ summary: 'Creates a new user' })
  @ApiBody({
    description: "The user's login and the user's password",
    type: '',
  })
  @ApiCreatedResponse({ type: '', description: '' })
  @ApiBadRequestResponse({ description: '' })
  addArtist(@Body() dto: CreateArtistDto) {
    return this.artistService.addArtist(dto);
  }
  @Get(':id')
  @ApiOperation({ summary: 'Get single artis by id' })
  @ApiOkResponse({ type: '', description: 'Created Succesfully' })
  @ApiParam({ name: 'id', required: true, description: 'uuid v4' })
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
