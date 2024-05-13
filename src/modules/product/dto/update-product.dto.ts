import { IsNotEmpty } from "class-validator";

export class updateProductDto {
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