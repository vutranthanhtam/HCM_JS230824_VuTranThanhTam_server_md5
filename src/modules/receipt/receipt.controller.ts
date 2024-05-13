import { Body, Controller, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { ReceiptService } from './receipt.service';
import { getReceiptDto } from './dto/get-receipt.dto';
import { Response } from 'express';
import { createReceiptDto } from './dto/create-receipt.dto';
import { ReqToken } from 'src/middlewares/token-middleware';
import { Status } from '@prisma/client';
import { updateReceiptDto } from './dto/update-receipt.dto';

@Controller('receipt')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  @Post("add-to-cart")
  async addToCart(@Req() req: ReqToken, @Body() body: {
    productId: number
  }, @Res() res: Response) {
    try {
      let productId = body.productId;
      let {err, data }= await  this.receiptService.findUserReceipt(req.data.id);
      if(!err) {
        let cart = data.find(item => item.status == Status.SHOPPING);
        if(!cart) {
          // tao moi
          let result = await this.receiptService.create({
            userId: req.data.id,
          }, productId)
          if(!result.err) {
            let result2 = await  this.receiptService.findUserReceipt(req.data.id);
            return res.status(200).json({
              message: 'Thêm vào giỏ hàng thành công! ',
              data: result2.data
            })
          }
        }else {
          let result3 = await this.receiptService.addToDetail({
            receiptId: cart.id,
            productId: productId,
            quantity: 1
          });
          return res.status(200).json({
            message: 'Thêm vào giỏ hàng thành công! ',
            data: result3
          })
        }
      }
    }catch(err) {
      
    }
  }

  @Get()
  async getReceiptAll(@Res() res: Response) {
    try {
      let result = await this.receiptService.getAllReceiptByUserId(1);
   
      res.status(200).json({
        message: 'Tìm tổng receipt thành công! ',
        data: result
      });
    }catch(err) {
      console.log(err);
    }
  }

  @Get(':id')
  async getReceiptById(@Res() res: Response, @Param('id') id: string) {
    try {
      let result = await this.receiptService.getReceiptsByUserId(+id);
      res.status(200).json({
        message: 'Tìm receipt thành công! ',
        data: result
      });
    }catch(err) {
      console.log(err);
    }
  }
  @Post()
  async createReceipt(@Res() res: Response, @Body() body: createReceiptDto) {
    try {
      
      let data = await this.receiptService.createReceipt(body);
      res.status(200).json({
        message: 'Tạo receipt thành công! ',
        data: data
      })
    }catch(err) {
      console.log(err);
    }
  }
  @Put('/:id')
  async updateReceipt(@Param(':id') id: number, @Res() res: Response, @Body() body: any) {
    try {
  
   

      let result = await this.receiptService.updateReceipt(id, body)

      res.status(200).json({
        message: 'Cập nhật receipt thành công',
        data: result
      });
    } catch (err) {
      console.log(err);
    }
  }
}
