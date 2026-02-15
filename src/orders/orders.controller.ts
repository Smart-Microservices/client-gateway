import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  ParseUUIDPipe,
  Query,
  Patch,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ORDER_SERVICE } from 'src/config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationOrderDto } from './dto/pagination-order.dto';
import { StatusOrderDto } from './dto/status-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly orderClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderClient.send({ cmd: 'create_order' }, createOrderDto).pipe(
      catchError((error) => {
        throw new RpcException(error as object);
      }),
    );
  }

  @Get()
  findAll(@Query() paginationOrderDto: PaginationOrderDto) {
    return this.orderClient
      .send({ cmd: 'find_all_orders' }, paginationOrderDto)
      .pipe(
        catchError((error) => {
          throw new RpcException(error as object);
        }),
      );
  }

  @Get('id/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderClient.send({ cmd: 'find_one_order_by_id' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error as object);
      }),
    );
  }

  @Get(':status')
  findAllByStatus(
    @Query() paginationOrderDto: PaginationOrderDto,
    @Param() statusOrderDto: StatusOrderDto,
  ) {
    return this.orderClient
      .send(
        { cmd: 'find_all_orders' },
        {
          ...paginationOrderDto,
          status: statusOrderDto.status,
        },
      )
      .pipe(
        catchError((error) => {
          throw new RpcException(error as object);
        }),
      );
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusOrderDto: StatusOrderDto,
  ) {
    return this.orderClient
      .send(
        { cmd: 'change_order_status' },
        { id, status: statusOrderDto.status },
      )
      .pipe(
        catchError((error) => {
          throw new RpcException(error as object);
        }),
      );
  }
}
