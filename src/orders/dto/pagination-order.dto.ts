import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { OrderStatus } from '../enum/status-order.enum';

export class PaginationOrderDto extends PaginationDto {
  @IsOptional()
  @IsEnum(OrderStatus, {
    message: `Order status must be one of ${Object.values(OrderStatus).join(', ')}`,
  })
  status?: OrderStatus;
}
