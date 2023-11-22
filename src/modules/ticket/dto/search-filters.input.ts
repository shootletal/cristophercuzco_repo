// search-tickets.dto.ts
import { IsDateString, IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { CategoryEnum } from 'src/constants/enum/category.enum';
import { PriorityEnum } from 'src/constants/enum/priority.enum';
import { StatusEnum } from 'src/constants/enum/status.enum';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SearchFiltersInput {
    @IsDateString()
    @IsOptional()
    @Field({nullable: true})
    start?: string;

    @IsDateString()
    @IsOptional()
    @Field({nullable: true})
    end?: string;

    @IsEnum(PriorityEnum, { each: true, message: 'Priority must be high, medium, or low' })
    @IsOptional()
    @Field(type => String, { nullable: true })
    priority?: PriorityEnum;

    @IsEnum(CategoryEnum, { each: true, message: 'Category must be incident, support, or error' })
    @IsOptional()
    @Field(type => String, { nullable: true })
    category?: CategoryEnum;

    @IsEnum(StatusEnum, { each: true, message: 'Status must be pending, verified, approved, or rejected' })
    @IsOptional()
    @Field(type => String, { nullable: true })
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