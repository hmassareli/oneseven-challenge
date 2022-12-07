import { Module } from '@nestjs/common';
import { CartProductsService } from './cart_products.service';
import { CartProductsController } from './cart_products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartProduct } from './entities/cart_product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartProduct])],
  controllers: [CartProductsController],
  providers: [CartProductsService],
})
export class CartProductsModule {}
