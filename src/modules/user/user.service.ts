import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createUserDto } from './dto/create-user.dto';
import { hashSync } from 'bcrypt';

@Injectable()
export class UserService {

    constructor (private prisma: PrismaService) {}

    async createUser(data: createUserDto) {
        try {
            let newUser = await this.prisma.user.create({
                data: {
                    ...data,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now())
                }
            })
            return {
                data: newUser,
            }
        }catch (err) {
            return {
                err
            }
        }
    }

    async findByUserName(userName: string) {
        try {
            let user = await this.prisma.user.findUnique({
                where: {
                    userName
                }
            })
            if(!user) throw {
                message: " Không tìm thấy người dùng! "
            }
            return {
                data: user 
            }
        }catch(err) {
            return {
                err
            }
        }
    }
}
