import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDER_SERVICE, PRODUCT_SERVICE } from '../config/services';
import { envs } from '../config/envs';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.productMicroservice.host,
          port: envs.productMicroservice.port,
        },
      },
      {
        name: ORDER_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.orderMicroservice.host,
          port: envs.orderMicroservice.port,
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class ClientsConfigModule {}
