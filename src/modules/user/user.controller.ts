import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { sign } from 'jsonwebtoken';
import { loginUserDto } from './dto/login-user.dto';
import { ReqToken } from 'src/middlewares/token-middleware';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async register(@Body() body: createUserDto, @Res() res: Response) {
    try {
      let { err, data } = await this.userService.createUser(body)
      
      if (err) {
        let errMessage = "Lỗi chưa xác định!"
        if (err?.meta?.target == "User_userName_key") {
          errMessage = " Tên đăng nhập đã tồn tại! "
        }
        if (err?.meta?.target == "User_email_key") {
          errMessage = "Email đã tồn tại!"
        }
        throw {
          message: errMessage
        }

      }

      if(data) {
        return res.status(200).json({
          message: "Tạo tài khoản thành công!",
          data: data
        })
      }
    } catch (err) {
      return res.status(500).json({
        message: err.message ? [err.message] : ["Lỗi hệ thống!"]
      })
    }
  }

  @Post('login')
  async login(@Body() body: loginUserDto, @Res() res: Response) {
    try {
      let { err, data } = await this.userService.findByUserName(body.userName)
      if(err) {
        throw err.message ? err  : {
          message: "Lỗi chưa xác định!"
        }
      }
      if(data.password != body.password) throw {
        message: "Mật khẩu không chính xác!"
      }
      if (data) {
        return res.status(200).json({
          message: "Đăng nhập thành công!",
          data: sign(data, process.env.JWT_KEY, {expiresIn: '1d'})
        })
      }
    } catch (err) {
      return res.status(500).json({
        message: err.message ? [err.message] : ["Lỗi hệ thống!"]
      })
    }
  }

  @Post('token')
  async token(@Req() req: ReqToken, @Res() res: Response) {
    return res.status(200).json({
      data: req.data
    })
  }
}
