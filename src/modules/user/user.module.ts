import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TokenMiddleware } from 'src/middlewares/token-middleware';
import { AdminMiddleware } from 'src/middlewares/admin-middleware';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(TokenMiddleware)
    .forRoutes(
      {path:"user/token", method: RequestMethod.POST, version: '1'},
    )
  }
}
