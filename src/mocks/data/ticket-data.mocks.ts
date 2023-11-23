import { Ticket } from '../../modules/ticket/entities/ticket.entity';
import { CategoryEnum } from '../../constants/enum/category.enum';
import { PriorityEnum } from '../../constants/enum/priority.enum';
import { StatusEnum } from '../../constants/enum/status.enum';
import {CreateTicketInput} from "../../modules/ticket/dto/create-ticket.input";

export const fakeDataTicket: Ticket[] = [
  {
    category: CategoryEnum.INCIDENT,
    createdAt: 2131231,
    description: 'Ticket 1',
    id: '1',
    priority: PriorityEnum.LOW,
    status: StatusEnum.PENDING,
    title: 'title',
  },
  {
    category: CategoryEnum.SUPPORT,
    createdAt: 2131231,
    description: 'Ticket 2',
    id: '2',
    priority: PriorityEnum.HIGH,
    status: StatusEnum.APPROVED,
    title: 'title 2',
  },
];

export const fakeRequestTicket: CreateTicketInput = {
  category: CategoryEnum.INCIDENT,
  status: StatusEnum.VERIFIED,
  description: CategoryEnum.INCIDENT,
  title: CategoryEnum.INCIDENT,
  priority: PriorityEnum.HIGH,
};
