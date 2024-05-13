import { IsNotEmpty } from "class-validator";
import { Receipt } from "@prisma/client";

export class updateReceiptDto {
    @IsNotEmpty()
    total: number;
    @IsNotEmpty()
    userId: number;
    @IsNotEmpty()
    detail: string;
    @IsNotEmpty()
    productId: number;
}