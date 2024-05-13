import { Get, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createBillDto } from './dto/creat-bill.dto';

@Injectable()
export class BillService {

    constructor(private prisma: PrismaService){}

    async getAllBill() {
        try {
            let bills = await this.prisma.user.findMany()
            return {
                data: bills
            }
        }catch(err) {
            console.log(err)
        }
    }

    async getBillByUserId(userId: number) {
        try {
            let bills = await this.prisma.user.findUnique({
                where: {
                    id: userId
                }
            })
            return {
                data: bills
            }
        }catch(err) {
            console.log(err)
        }
    }

    async createBill(data: any) {
        try {
            let newBill = await this.prisma.user.create({
                data: {
                    ...data,
                }
            })
            return {
                data: newBill,
            }
        } catch (err) {
            return {
                err
            }
        }
    }
}
