// search-tickets.dto.ts
import { IsDateString, IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { PriorityEnum } from '../../../constants/enum/priority.enum';
import { CategoryEnum } from '../../../constants/enum/category.enum';
import { StatusEnum } from '../../../constants/enum/status.enum';

@InputType()
export class SearchFiltersInput {
  @IsDateString()
  @IsOptional()
  @Field({ nullable: true })
  start?: string;

  @IsDateString()
  @IsOptional()
  @Field({ nullable: true })
  end?: string;

  @IsEnum(PriorityEnum, {
    each: true,
    message: 'Priority must be high, medium, or low',
  })
  @IsOptional()
  @Field(() => String, { nullable: true })
  priority?: PriorityEnum;

  @IsEnum(CategoryEnum, {
    each: true,
    message: 'Category must be incident, support, or error',
  })
  @IsOptional()
  @Field(() => String, { nullable: true })
  category?: CategoryEnum;

  @IsEnum(StatusEnum, {
    each: true,
    message: 'Status must be pending, verified, approved, or rejected',
  })
  @IsOptional()
  @Field(() => String, { nullable: true })
  status?: StatusEnum;

  @IsInt()
  @Min(0)
  @Field()
  skip: number;

  @IsInt()
  @Min(1)
  @Field()
  limit: number;
}
