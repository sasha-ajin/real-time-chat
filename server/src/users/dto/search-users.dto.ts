import { IsOptional, IsString, MaxLength } from 'class-validator';

export class SearchUsersDto {
  @IsString()
  @IsOptional()
  @MaxLength(50)
  userName?: string;
}
