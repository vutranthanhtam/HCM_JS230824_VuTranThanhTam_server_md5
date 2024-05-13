import { Body, Controller, Delete, Get, Param, Post, Put, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { Response } from 'express';
import { createProductDto } from './dto/create-product.dto';
import { updateProductDto } from './dto/update-product.dto';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProduct(@Res() res: Response) {
    try {
      let result = await this.productService.getAllProduct();
       res.status(200).json({
        message: 'Tìm product thành công! ',
        data: result
      });
    }catch (err) {
      console.log(err);
    }
    // try {
    //   let { err, data } = await this.categoryService.getAllCategory();
    //   if (err) {
    //     let errMessage = "Lỗi chưa xác định!"
    //     throw {
    //       message: errMessage
    //     }
    //   }
    //   if(data) {
    //     res.status(200).json({
    //       message: 'Tìm category thành công',
    //       data: data
    //     })
    //   }
    // } catch (err) {
    //   return res.status(500).json({
    //     message: err.message ? [err.message] : ["Lỗi hệ thống!"]
    //   })
    // }
  }

  @Post()
  // @UseInterceptors(FileInterceptor('image'))
  async createProduct(@Body() body: createProductDto, @Res() res: Response, @UploadedFile() file: Express.Multer.File) {

    // if (!file) {
    //   return res.status(400).json({ message: 'Không có tệp được tải lên.' });
    // }

    // let filename = ` ${Math.ceil(Math.random() * Date.now())}_image.${file.mimetype.split('/')[1]}`
    // writeFileSync(join(__dirname, '../../../public/'+ filename), file.buffer)

    try {
      let data = await this.productService.createProduct({...body, categoryId: Number(body.categoryId)});
      res.status(200).json({
        message: 'Tạo product thành công! ',
        data: data
      });

    } catch (err) {
      console.log(err);
    }
    // try {
    //   let { err, data } = await this.categoryService.createCategory(body);
    //   if (err) {
    //     let errMessage = "Lỗi chưa xác định!"
    //     if (err?.meta?.target == "Category_name_key") {
    //       errMessage = " Tên category đã bị trùng! "
    //     }
    //     if (err?.meta?.target == "Category_image_key") {
    //       errMessage = " Avatar category đã bị trùng! "
    //     }
    //     throw {
    //       message: errMessage
    //     }
    //   }
    //   if(data) {
    //     res.status(200).json({
    //         message: 'Tạo category thành công',
    //         data: data
    //       })
    //   } 
    // }catch (err) {
    //   return res.status(500).json({
    //     message: err.message ? [err.message] : ["Lỗi hệ thống!"]
    //   })
    // }
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string, @Res() res: Response) {
    try {
      let result = await this.productService.deleteProduct(Number(id));
      res.status(200).json({
        message: 'Xóa product thành công',
        data: result
      });
    } catch (err) {
      console.log(err);
    }
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async updateProduct(@Param('id') id: string, @Body() body: updateProductDto, @Res() res: Response, @UploadedFile() file: Express.Multer.File) {

    if (!file) {
      return res.status(400).json({ message: 'Không có tệp được tải lên.' });
    }

    let filename = ` ${Math.ceil(Math.random() * Date.now())}_image.${file.mimetype.split('/')[1]}`
    writeFileSync(join(__dirname, '../../../public/'+ filename), file.buffer)

    try {
      let result = await this.productService.updateProduct(Number(id), body);
      res.status(200).json({
        message: 'Cập nhật product thành công',
        data: result
      });
    } catch (err) {
      console.log(err);
    }
  }
}
