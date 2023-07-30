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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/track.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Track')
@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}
  @Get()
  findAll() {
    return this.trackService.findAll();
  }
  @Post()
  addTrack(@Body() dto: CreateTrackDto) {
    return this.trackService.addTrack(dto);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    const Track = this.trackService.findOne(id);
    return Track;
  }
  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param('id') id: string) {
    return this.trackService.deleteTrack(id);
  }
  @Put(':id')
  updateTrack(@Param('id') id: string, @Body() dto: CreateTrackDto) {
    return this.trackService.updateTrack(id, dto);
  }
}
