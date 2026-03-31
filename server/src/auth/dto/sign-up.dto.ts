import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import {
  USERNAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
} from '../../common/constants/validation.constants';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(USERNAME_MAX_LENGTH)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(EMAIL_MAX_LENGTH)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(PASSWORD_MAX_LENGTH)
  password: string;
}
