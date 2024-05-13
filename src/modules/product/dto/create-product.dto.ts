import { IsNotEmpty } from "class-validator";
import { Product } from "@prisma/client";

export class createProductDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    price: number;
    @IsNotEmpty()
    image: string;
    @IsNotEmpty()
    description: string;
    @IsNotEmpty()
    categoryId: number;
}