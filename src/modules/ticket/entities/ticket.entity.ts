import { ObjectType, Field } from '@nestjs/graphql';
import { GraphQLFloat } from 'graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { PriorityEnum } from '../../../constants/enum/priority.enum';
import { CategoryEnum } from '../../../constants/enum/category.enum';
import { StatusEnum } from '../../../constants/enum/status.enum';

@Entity()
@ObjectType()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'Field database  (id)' })
  id: string;

  @Column()
  @Field({ description: 'Field database (title)' })
  title: string;

  @Column()
  @Field({ description: 'Field database (description)' })
  description: string;

  @Column()
  @Field(() => String, { description: 'Field database (priority)' })
  priority: PriorityEnum;

  @Column()
  @Field(() => String, { description: 'Field database (category)' })
  category: CategoryEnum;

  @Column()
  @Field(() => String, { description: 'Field database (status)' })
  status: StatusEnum;

  @Column()
  @Field(() => GraphQLFloat, { description: 'Field database (createdAt)' })
  createdAt: number;
}
