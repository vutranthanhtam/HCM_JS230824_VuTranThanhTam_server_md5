import { Controller, Post, Req, Res } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ReqTokenAdmin } from 'src/middlewares/admin-middleware';
import { Response } from 'express';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('token')
  async token(@Req() req: ReqTokenAdmin, @Res() res: Response) {
    return res.status(200).json({
      data: req.data
    })
  }
}
