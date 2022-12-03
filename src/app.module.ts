import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartProductsModule } from './cart_products/cart_products.module';

@Module({
  imports: [
    ConfigModule,
    ConfigModule.forRoot({ envFilePath: '.env' }),
    CartProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
