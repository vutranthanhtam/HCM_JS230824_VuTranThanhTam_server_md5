import { Get, Injectable, Param, Post } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { getReceiptDto } from './dto/get-receipt.dto';
import { createReceiptDto } from './dto/create-receipt.dto';
import { updateReceiptDto } from './dto/update-receipt.dto';
import { ReceiptDetail } from '@prisma/client';

@Injectable()
export class ReceiptService {

    constructor(private prisma: PrismaService) { }

    async findUserReceipt(userId: number) {
        try {
            let receipts = await this.prisma.receipt.findMany({
                where: {
                    userId
                }
            })
            return {
                data: receipts
            }
        } catch (err) {
            return {
                err
            }
        }
    }

    async create(data: {
        userId: number
    }, productId: number) {
        try {
            let receipts = await this.prisma.receipt.create({
                data: {
                    ...data,
                    createAt: String(Date.now()),
                    ReceiptDetail: {
                        create: {
                            productId,
                            quantity: 1
                        }
                    }
                },
                include: {
                    ReceiptDetail: true
                }
            })
            return {
                data: receipts
            }
        } catch (err) {
            return {
                err
            }
        }
    }




    async getAllReceiptByUserId(userId: number) {
        try {
            let receipt = await this.prisma.receipt.findMany(
                {
                    where: {
                        userId
                    }
                }
            )
           
            let receiptDetail = await this.prisma.receiptDetail.findMany(
                {
                    where: {
                        receiptId: receipt[0].id
                    }
                }
            )

            return {
                data: [{
                    id: receipt[0].id,
                    total: receipt[0].total,
                    userId: receipt[0].userId,
                    createAt: receipt[0].createAt,
                    status: receipt[0].status,
                    receiptDetail: receiptDetail
                }]
            }
        } catch (err) {
            console.log(err)
        }
    }


    async getReceiptsByUserId(userId: number) {
        try {
            let receipt = await this.prisma.receipt.findUnique({
                where: {
                    id: userId
                }, include: {
                    ReceiptDetail: true
                }
            })
            return {
                data: receipt
            }
        } catch (err) {
            console.log(err)
        }
    }




    async createReceipt(data: createReceiptDto) {
        try {
            
            let newReceipt = await this.prisma.receipt.create({
                data: {
                    ...data,
                    createAt: String(Date.now()),
                }
            })
            return {
                data: newReceipt
            }
        } catch (err) {
            console.log(err)
        }
    }

    async updateReceipt(id: number, data: any) {
        try {
         
            // let updateReceipt = await this.prisma.receipt.updateMany({
            //     where: {
            //         id
            //     },
            //     data: {
            //         ...data,
            //         createAt: String(Date.now())
            //     }
            // })
            
            let dataUpdate: ReceiptDetail[] = [];
            for (const item of data.receiptDetail[0]) {
             
                const receipt = await this.prisma.receiptDetail.update({
                    where: {
                        id: item.id
                    },
                    data: {
                        receiptId: item.receiptId,
                        productId: item.productId,
                        quantity: item.quantity,
                    }
                });
     
                dataUpdate.push(receipt)
            

            }

            
             return dataUpdate
        } catch (err) {
            console.log(err)
        }
    }

    async addToDetail(data: {
        productId: number,
        receiptId: number,
        quantity: number
    }) {
        try {
            let detail = await this.prisma.receiptDetail.create({
                data
            })
            return {
                data: detail
            }
        } catch (err) {
            return {
                err
            }
        }

    }
}
