import { CategoryEnum } from "../enum/category.enum";

export const CategoryTranslate: Record<CategoryEnum, number> = {
    [CategoryEnum.INCIDENT]: 1,
    [CategoryEnum.SUPPORT]: 2,
    [CategoryEnum.ERROR]: 3,
}