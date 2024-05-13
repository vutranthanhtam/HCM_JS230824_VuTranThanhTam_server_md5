import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { createCategoryDto } from './dto/create-category.dto';
import { Response } from 'express';
import { updateCategoryDto } from './dto/update-category.dto';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Get()
  async getAllCategory(@Res() res: Response) {
    // try {
    //   let result = await this.categoryService.getAllCategory();
    //    res.status(200).json({
    //     message: 'Tìm category thành công',
    //     data: result
    //   });
    // }catch (err) {
    //   console.log(err);
    // }
    try {
      let { err, data } = await this.categoryService.getAllCategory();
      if (err) {
        let errMessage = "Lỗi chưa xác định!"
        throw {
          message: errMessage
        }
      }
      if (data) {
        res.status(200).json({
          message: 'Tìm category thành công',
          data: data
        })
      }
    } catch (err) {
      return res.status(500).json({
        message: err.message ? [err.message] : ["Lỗi hệ thống!"]
      })
    }
  }

  @Post()
  // @UseInterceptors(FileInterceptor('image'))
  async createCategory(@Body() body: createCategoryDto, @Res() res: Response, @UploadedFile() file: Express.Multer.File) {
    // if (!file) {
    //   return res.status(400).json({ message: 'Không có tệp được tải lên.' });
    // }

    // let filename = ` ${Math.ceil(Math.random() * Date.now())}_image.${file.mimetype.split('/')[1]}`
    // console.log('filename', filename);
    // writeFileSync(join(__dirname, '../../../public/' + filename), file.buffer)

    try {
      let { err, data } = await this.categoryService.createCategory({ ...body });
      if (err) {
        let errMessage = "Lỗi chưa xác định!"
        if (err?.meta?.target == "Category_name_key") {
          errMessage = " Tên category đã bị trùng! "
        }
        if (err?.meta?.target == "Category_image_key") {
          errMessage = " Avatar category đã bị trùng! "
        }
        throw {
          message: errMessage
        }
      }
      if (data) {
        res.status(200).json({
          message: 'Tạo category thành công',
          data: {
            ...data,

          }
        })
      }
    } catch (err) {
      return res.status(500).json({
        message: err.message ? [err.message] : ["Lỗi hệ thống!"]
      })
    }
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string, @Res() res: Response) {
    try {
      let result = await this.categoryService.deleteCategory(Number(id));
      res.status(200).json({
        message: 'Xóa category thành công',
        data: result
      });
    } catch (err) {
      console.log(err);
    }
  }

  @Put(':id')
  // @UseInterceptors(FileInterceptor('image'))
  async updateCategory(@Param('id') id: string, @Body() body: updateCategoryDto, @Res() res: Response, @UploadedFile() file: Express.Multer.File) {

    // if (!file) {
    //   return res.status(400).json({ message: 'Không có tệp được tải lên.' });
    // }

    // let filename = ` ${Math.ceil(Math.random() * Date.now())}_image.${file.mimetype.split('/')[1]}`
    // writeFileSync(join(__dirname, '../../../public/'+ filename), file.buffer)

    try {
      let result = await this.categoryService.updateCategory(Number(id), { ...body });
      res.status(200).json({
        message: 'Cập nhật category thành công',
        data: result
      });
    } catch (err) {
      console.log(err);
    }
  }
}
