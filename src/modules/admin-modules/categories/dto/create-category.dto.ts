import { IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiPropertyOptional({
    description: 'Name of the category',
    type: String,
  })
  @IsOptional()
  @IsString()
  category_name?: string;

  @ApiPropertyOptional({
    description: 'UUID of the parent category',
    type: String,
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID()
  parent_id?: string;

  @ApiPropertyOptional({
    description: 'UUID of the media associated with the category',
    type: String,
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID()
  media_id?: string;
}
