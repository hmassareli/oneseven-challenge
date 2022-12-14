import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cart_products')
export class CartProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  img_url: string;

  @Column()
  value: string;

  @Column()
  product_id: number;

  @Column()
  quantity: number;

  @Column()
  brand: string;

  @Column()
  category: string;
}
