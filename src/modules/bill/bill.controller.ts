import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { BillService } from './bill.service';
import { Response } from 'express';
import { createUserDto } from '../user/dto/create-user.dto';
import { getBillUserIdDto } from './dto/getByUserId.dto';

@Controller('bill')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Get()
  async getAllBill(@Res() res: Response) {
    try {
      let result = await this.billService.getAllBill();
       res.status(200).json({
        message: 'Tìm tổng bill thành công! ',
        data: result
      });
    }catch (err) {
      console.log(err);
    }
    
  }
  @Get()
  async getBillByUserId(@Res() res: Response, @Body() body: getBillUserIdDto){
    try {
      let result = await this.billService.getBillByUserId(body.userId);
       res.status(200).json({
        message: 'Tìm bill thành công! ',
        data: result
      });
    }catch (err) {
      console.log(err);
    }
    
  }

  @Post()
  async createBill(@Res() res: Response, @Body() body: any){
    try {
      let newBill = await this.billService.createBill(body);
       res.status(200).json({
        message: 'Tạo bill thành công! ',
        data: newBill
      })
    }catch (err) {
      console.log(err);
    }
  }
}
