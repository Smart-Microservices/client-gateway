import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatus } from '../enum/status-order.enum';

export class StatusOrderDto {
  @IsOptional()
  @IsEnum(OrderStatus, {
    message: `Order status must be one of ${Object.values(OrderStatus).join(', ')}`,
  })
  status: OrderStatus;
}
