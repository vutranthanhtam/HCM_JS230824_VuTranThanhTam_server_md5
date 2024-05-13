import { IsNotEmpty } from "class-validator";

export class getBillUserIdDto {
    @IsNotEmpty()
    userId: number;
}