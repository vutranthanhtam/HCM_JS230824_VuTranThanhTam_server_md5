import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ReceiptService } from './receipt.service';
import { ReceiptController } from './receipt.controller';
import { TokenMiddleware } from 'src/middlewares/token-middleware';

@Module({
  controllers: [ReceiptController],
  providers: [ReceiptService],
})
export class ReceiptModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(TokenMiddleware)
    .forRoutes(
      {path:"receipt/add-to-cart", method: RequestMethod.POST, version: '1'},
    )
  }
}