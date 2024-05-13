import { IsEmail, IsString, Length } from "class-validator";

export class createUserDto {
    @Length(4,20,{message:'Yêu cầu từ 4-20 kí tự'})
    userName: string;
    @IsString()
    @Length(4,20,{message:'Yêu cầu từ 4-20 kí tự'}) 
    password: string;
    @IsEmail()
    email: string;
}