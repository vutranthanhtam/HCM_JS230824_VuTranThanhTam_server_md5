import { IsNotEmpty } from "class-validator";
import { Product } from "@prisma/client";

export class createCategoryDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    image: string;
}