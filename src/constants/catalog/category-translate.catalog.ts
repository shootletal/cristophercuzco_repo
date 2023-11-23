import { CategoryEnum, CodeCategoryEnum } from '../enum/category.enum';

export const CategoryTranslate: Record<CategoryEnum, number> = {
  [CategoryEnum.INCIDENT]: 1,
  [CategoryEnum.SUPPORT]: 2,
  [CategoryEnum.ERROR]: 3,
};

export const CodeCategoryTranslate: Record<CodeCategoryEnum, string> = {
  [CodeCategoryEnum.CODE_604]: 'verified',
  [CodeCategoryEnum.CODE_606]: 'approved',
  [CodeCategoryEnum.CODE_607]: 'rejected',
};
