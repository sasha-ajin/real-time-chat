import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class SearchUsersDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  nickname: string;
}
