import { IsMongoId, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { MESSAGE_TEXT_MAX_LENGTH } from '../../common/constants/validation.constants';

export class SendMessageDto {
  @IsNotEmpty()
  @IsMongoId()
  threadId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(MESSAGE_TEXT_MAX_LENGTH)
  text: string;
}
