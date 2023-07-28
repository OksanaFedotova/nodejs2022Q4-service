import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  year: number;
  @IsString()
  @ValidateIf((_object, value) => value !== null)
  artistId: string | null;
}
