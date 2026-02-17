import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { NATS_SERVERS } from '../config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { catchError } from 'rxjs';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(@Inject(NATS_SERVERS) private readonly client: ClientProxy) {}

  @Post()
  create(@Body() createProdductDto: CreateProductDto) {
    return this.client.send({ cmd: 'create_product' }, createProdductDto).pipe(
      catchError((error) => {
        throw new RpcException(error as object);
      }),
    );
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.client.send({ cmd: 'find_all_products' }, paginationDto);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    // Manejo con Observable
    return this.client.send({ cmd: 'find_product_by_id' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error as object);
      }),
    );

    // Manejo con Promesa
    // try {
    //   const product: Product = await firstValueFrom(
    //     this.productClient.send({ cmd: 'find_product_by_id' }, { id }),
    //   );
    //   return product;
    // } catch (error) {
    //   throw new RpcException(error as object);
    // }
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.client
      .send(
        { cmd: 'update_product' },
        {
          id,
          ...updateProductDto,
        },
      )
      .pipe(
        catchError((error) => {
          throw new RpcException(error as object);
        }),
      );
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.client.send({ cmd: 'delete_product' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error as object);
      }),
    );
  }
}
