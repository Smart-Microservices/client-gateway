import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsConfigModule } from 'src/clients/clients.module';

@Module({
  imports: [ClientsConfigModule],
  controllers: [OrdersController],
  providers: [],
})
export class OrdersModule {}
