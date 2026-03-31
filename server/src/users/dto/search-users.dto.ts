import { IsOptional, IsString, MaxLength } from 'class-validator';
import { USERNAME_MAX_LENGTH } from '../../common/constants/validation.constants';

export class SearchUsersDto {
  @IsString()
  @IsOptional()
  @MaxLength(USERNAME_MAX_LENGTH)
  userName?: string;
}
