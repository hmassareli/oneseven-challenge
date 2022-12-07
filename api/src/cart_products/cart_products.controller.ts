import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CartProductsService } from './cart_products.service';
import { CreateCartProductDto } from './dto/create-cart_product.dto';
import { UpdateCartProductDto } from './dto/update-cart_product.dto';

@Controller('CartProducts')
export class CartProductsController {
  constructor(private readonly cartService: CartProductsService) {}

  @Post()
  create(@Body() createCartProductDto: CreateCartProductDto) {
    return this.cartService.create(createCartProductDto);
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCartProductDto: UpdateCartProductDto,
  ) {
    return this.cartService.update(+id, updateCartProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
