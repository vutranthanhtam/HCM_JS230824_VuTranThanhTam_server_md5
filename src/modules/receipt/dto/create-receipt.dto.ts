import { IsNotEmpty } from "class-validator";
import { Receipt } from "@prisma/client";


export class createReceiptDto {
    @IsNotEmpty()
    total: number;
    @IsNotEmpty()
    userId: number;
    @IsNotEmpty()
    detail: string;
    @IsNotEmpty()
    productId: number;

    
}