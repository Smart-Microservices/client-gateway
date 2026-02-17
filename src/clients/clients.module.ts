import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NATS_SERVERS } from '../config/services';
import { envs } from '../config/envs';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: NATS_SERVERS,
        transport: Transport.NATS,
        options: {
          servers: envs.natsServers,
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class ClientsConfigModule {}
