import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartProductsModule } from './cart_products/cart_products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartProduct } from './cart_products/entities/cart_product.entity';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: +configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [CartProduct],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    CartProductsModule,
    ConfigModule.forRoot({ envFilePath: ['.env'] }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
