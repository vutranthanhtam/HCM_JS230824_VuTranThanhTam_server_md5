import { IsNotEmpty } from "class-validator";

export class updateCategoryDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    image: string;
}