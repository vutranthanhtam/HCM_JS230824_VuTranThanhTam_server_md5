import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminMiddleware } from 'src/middlewares/admin-middleware';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AdminMiddleware)
    .forRoutes(
      {path:"admin/token", method: RequestMethod.POST, version: '1'},
    )
  }
}
