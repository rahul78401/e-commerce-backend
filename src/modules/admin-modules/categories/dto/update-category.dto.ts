import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { IsOptional, IsUUID, IsBoolean, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  category_name?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @ApiPropertyOptional({
    description: 'UUID of the parent category',
    type: String,
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID()
  parent_id?: string;
}
