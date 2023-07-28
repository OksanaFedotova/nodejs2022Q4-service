import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  duration: number;
  @IsString()
  @ValidateIf((_object, value) => value !== null)
  artistId: string | null;
  @IsString()
  @ValidateIf((_object, value) => value !== null)
  albumId: string | null;
}
