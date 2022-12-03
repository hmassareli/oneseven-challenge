import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CartProduct } from './entities/cart_product.entity';
import { CartProductsService } from './cart_products.service';

describe('CartProductService', () => {
  let service: CartProductsService;
  const mockCartProduct: CartProduct = new CartProduct();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<CartProductsService>(CartProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return array of cartProducts', async () => {
      const cartProducts = await service.findAll();
      expect(cartProducts).toStrictEqual([mockCartProduct]);
    });
  });
});
