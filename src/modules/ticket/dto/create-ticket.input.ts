import { InputType, Field } from '@nestjs/graphql';
import { PriorityEnum } from '../../../constants/enum/priority.enum';
import { CategoryEnum } from '../../../constants/enum/category.enum';
import { StatusEnum } from '../../../constants/enum/status.enum';

@InputType()
export class CreateTicketInput {
  @Field({ description: 'Example field (title)' })
  title: string;

  @Field({ description: 'Example field (description)' })
  description: string;

  @Field(() => String, { description: 'Example field (priority)' })
  priority: PriorityEnum;

  @Field(() => String, { description: 'Example field (category)' })
  category: CategoryEnum;

  @Field(() => String, { description: 'Example field (status)' })
  status: StatusEnum;
}
