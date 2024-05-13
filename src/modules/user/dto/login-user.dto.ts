import { IsString, Length } from "class-validator";

export class loginUserDto {
    @Length(4,20)
    userName: string;
    @IsString() 
    password: string;
    
}