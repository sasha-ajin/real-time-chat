import { IsMongoId, IsNotEmpty } from 'class-validator';

export class ThreadIdDto {
  @IsNotEmpty()
  @IsMongoId()
  threadId: string;
}
