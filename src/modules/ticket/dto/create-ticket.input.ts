import { InputType, Field } from '@nestjs/graphql';
import { CategoryEnum } from 'src/constants/enum/category.enum';
import { PriorityEnum } from 'src/constants/enum/priority.enum';
import { StatusEnum } from 'src/constants/enum/status.enum';

@InputType()
export class CreateTicketInput {
  @Field({ description: 'Example field (title)' })
  title: string;

  @Field({ description: 'Example field (description)' })
  description: string;

  @Field(type => String, { description: 'Example field (priority)' })
  priority: PriorityEnum;

  @Field(type => String, { description: 'Example field (category)' })
  category: CategoryEnum;

  @Field(type => String, { description: 'Example field (status)' })
  status: StatusEnum;
}
