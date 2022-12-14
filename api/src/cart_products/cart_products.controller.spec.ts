import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CartProduct } from './entities/cart_product.entity';
import { CartProductsController } from './cart_products.controller';
import { CartProductsService } from './cart_products.service';

describe('CartProductsController', () => {
  let controller: CartProductsController;
  const mockCartProduct: CartProduct = new CartProduct();
  let cartProductsService: CartProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartProductsController],
      providers: [
        CartProductsService,
        {
          provide: getRepositoryToken(CartProduct),
          useValue: {
            save: jest.fn().mockResolvedValue(mockCartProduct),
            find: jest.fn().mockResolvedValue([mockCartProduct]),
          },
        },
      ],
    }).compile();

    controller = module.get<CartProductsController>(CartProductsController);
    cartProductsService = module.get<CartProductsService>(CartProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return array of cartProducts', async () => {
      const result = [
        {
          id: 1,
          product_id: 1,
          name: 'Computador',
          img_url:
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fbr.freepik.com%2Ffotos-vetores-gratis%2Fcomputador&psig=AOvVaw2uIHE0hiBonMFFcvgZjfoP&ust=1670109591237000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCOjf3ZiJ3PsCFQAAAAAdAAAAABAE',
          value: '10.00',
          quantity: 1,
          brand: 'Dell',
          category: 'Computadores',
        },
      ];
      jest
        .spyOn(cartProductsService, 'findAll')
        .mockImplementation(async () => await result);
      expect(await controller.findAll()).toBe(result);
    });
  });
});
