import { Delete, Get, Injectable, Post, Put } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createCategoryDto } from './dto/create-category.dto';
import { updateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {

    constructor(private prisma: PrismaService) { }

    async getAllCategory() {
        try {
            let categories = await this.prisma.category.findMany()
            return {
                data: categories
            }
        } catch (err) {
            return {
                err
            }
        }
    }

    async createCategory(data: createCategoryDto) {
        try {
            let newCategory = await this.prisma.category.create({
                data: {
                    ...data,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now()),
                }
            })
            return {
                data: newCategory,
            }
        } catch (err) {
            return {
                err
            }
        }
    }

    async updateCategory(id: number, data: updateCategoryDto) {
        try {
            let updateCategory = await this.prisma.category.update({
                where: {
                    id: id
                },
                data: {
                    ...data,
                    updateAt: String(Date.now())
                }
            })
            return updateCategory
        } catch (err) {
            return {
                err
            }
        }
    }

    async deleteCategory(id: number) {
        try {
            let deleteCategory = await this.prisma.category.delete({
                where: {
                    id: id
                }
            })
            return deleteCategory
        } catch (err) {
            return {
                err
            }
        }
    }
}
