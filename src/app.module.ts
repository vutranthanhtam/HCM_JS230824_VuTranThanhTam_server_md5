import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AdminModule } from './modules/admin/admin.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { ReceiptModule } from './modules/receipt/receipt.module';
import { BillModule } from './modules/bill/bill.module';



@Module({
  imports: [UserModule, PrismaModule, AdminModule, CategoryModule, ProductModule, ReceiptModule, BillModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
