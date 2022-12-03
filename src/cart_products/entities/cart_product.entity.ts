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
}
