import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AdminLoginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'admin@ecom.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Ecom@123',
  })
  password: string;
}
