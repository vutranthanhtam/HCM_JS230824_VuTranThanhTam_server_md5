import { Injectable, NestMiddleware } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { PrismaService } from 'src/modules/prisma/prisma.service';

export interface ReqTokenAdmin extends Request {
    data: User
}
@Injectable()
export class AdminMiddleware implements NestMiddleware {

    constructor(private prisma: PrismaService) {}
   async use(req: ReqTokenAdmin, res: Response, next: NextFunction) {
    try {
        let token = req.headers.token || req.body.token || req.query.token || null
        if (!token) throw {
            message: 'Token invalid'
        }
        let tokenData = (verify(token, process.env.JWT_KEY) as User)
        if (!tokenData) throw {
            message: 'Token invalid'
        }
        let user = await this.prisma.user.findUnique({
            where: {
                userName: tokenData.userName
            }
        })
        if (!user) throw {
            message: 'Token invalid'
        }
        if (user.updateAt != tokenData.updateAt) throw {    
            message: 'Token invalid'
        }
        if (user.role == 'USER') throw {
            message: 'Token invalid'
        }
        req.data = user
    } catch (err) {
        return res.status(500).json({
            message: err.message ? err.message : [
                " Lỗi ko xác định! "
            ]
        })
    }
    next();
  }
}
