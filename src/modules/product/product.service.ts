import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createProductDto } from './dto/create-product.dto';
import { updateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {

    constructor(private prisma: PrismaService){}

    async getAllProduct() {
        try {
            let products = await this.prisma.product.findMany()
            return {
                data: products
            }
        } catch (err) {
            console.log(err)
        }
    }

    async createProduct(data: createProductDto) {
        try {
            let newProduct = await this.prisma.product.create({
                data: {
                    ...data,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now()),
                }
            })
            return {
                data: newProduct,
            }
        } catch (err) {
            console.log(err)
            return {
                err
            }
        }
    }

    async updateProduct(id: number, data: updateProductDto) {
        try {
            let updateProduct = await this.prisma.product.update({
                where: {
                    id: id
                },
                data: {
                    ...data,
                    updateAt: String(Date.now())
                }
            })
            return updateProduct
        } catch (err) {
            console.log(err)
        }
    }
    async deleteProduct(id: number) {
        try {
            let deleteProduct = await this.prisma.product.delete({
                where: {
                    id: id
                }
            })
            return deleteProduct
        } catch (err) {
            console.log(err)
        }
    }
}
