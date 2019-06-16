import { IsNotEmpty } from 'class-validator';

export class CreateModuDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}
