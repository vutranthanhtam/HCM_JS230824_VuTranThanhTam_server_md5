import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Category } from '@prisma/client';

@Global()
@Module({
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
