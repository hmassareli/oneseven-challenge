import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCartProductDto } from './dto/create-cart_product.dto';
import { UpdateCartProductDto } from './dto/update-cart_product.dto';
import { CartProduct } from './entities/cart_product.entity';

@Injectable()
export class CartProductsService {
  constructor(
    @InjectRepository(CartProduct)
    private cartProductRepository: Repository<CartProduct>,
  ) {}

  create(createCartProductDto: CreateCartProductDto) {
    return this.cartProductRepository.save(createCartProductDto);
  }

  findAll() {
    return this.cartProductRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  findOne(id: number) {
    return this.cartProductRepository.findOneBy({ id });
  }

  async update(id: number, updateCartProductDto: UpdateCartProductDto) {
    const cartProduct = await this.cartProductRepository.findOneBy({ id });
    if (!cartProduct) {
      throw new NotFoundException('cart product not found');
    }
    cartProduct.name = updateCartProductDto.name ?? cartProduct.name;
    cartProduct.img_url = updateCartProductDto.img_url ?? cartProduct.img_url;
    cartProduct.product_id =
      updateCartProductDto.product_id ?? cartProduct.product_id;
    cartProduct.value = updateCartProductDto.value ?? cartProduct.value;
    cartProduct.quantity =
      updateCartProductDto.quantity ?? cartProduct.quantity;
    return this.cartProductRepository.save(cartProduct);
  }

  async remove(id: number) {
    // check if cart product exists
    const cartProduct = await this.cartProductRepository.findOneBy({ id });
    if (!cartProduct) {
      throw new NotFoundException('cart product not found');
    }
    this.cartProductRepository.delete(id);
  }
}
