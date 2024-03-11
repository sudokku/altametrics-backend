import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { BillModule } from './bill/bill.module';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    BillModule,
    InvoiceModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
