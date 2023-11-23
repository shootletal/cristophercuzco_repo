import moment = require('moment');
import { Between, ObjectLiteral } from 'typeorm';

export const applyFilterCondition = (
  field: string,
  value: string | number,
): ObjectLiteral => {
  return { [field]: value };
};

export const applyDateFilterCondition = (
  field: string,
  startDate: string,
  endDate: string,
): ObjectLiteral => {
  return {
    [field]: Between(moment(startDate).valueOf(), moment(endDate).valueOf()),
  };
};
