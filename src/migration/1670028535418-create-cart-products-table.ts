import { MigrationInterface, QueryRunner } from 'typeorm';

export class createCartproductsTable1670006629280
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            create table cart_products (
                id bigserial primary key,
                name text,
                img_url text,
                value text,
                product_id bigserial
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`drop table cart_products`);
  }
}
