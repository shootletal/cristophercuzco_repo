import { ObjectType, Field  } from '@nestjs/graphql';
import { GraphQLFloat } from 'graphql';
import { CategoryEnum } from 'src/constants/enum/category.enum';
import { PriorityEnum } from 'src/constants/enum/priority.enum';
import { StatusEnum } from 'src/constants/enum/status.enum';
import { Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
@ObjectType()
export class Ticket {
    @PrimaryGeneratedColumn("uuid")
    @Field(() => String, { description: 'Field database  (id)' })
    id: string;

    @Column()
    @Field({ description: 'Field database (title)' })
    title: string;

    @Column()
    @Field({ description: 'Field database (description)' })
    description: string;

    @Column()
    @Field(type => String, { description: 'Field database (priority)' })
    priority: PriorityEnum;

    @Column()
    @Field(type => String, { description: 'Field database (category)' })
    category: CategoryEnum;

    @Column()
    @Field(type => String, { description: 'Field database (status)' })
    status: StatusEnum;

    @Column()
    @Field(type => GraphQLFloat , { description: 'Field database (createdAt)' })
    createdAt: number;
}
