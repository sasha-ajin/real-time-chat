import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateThreadDto {
  @IsNotEmpty()
  @IsMongoId()
  participantId: string;
}
