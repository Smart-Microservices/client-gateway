import { ArgumentsHost, Catch } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

type RpcError = {
  status: number;
  message: string;
};

@Catch(RpcException)
export class ExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    // Crear respuesta de error personalizada
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const rpcError: RpcError = exception.getError() as RpcError;

    console.error('RPC Exception caught:', rpcError);

    if (
      typeof rpcError === 'object' &&
      rpcError !== null &&
      'status' in rpcError &&
      'message' in rpcError &&
      typeof rpcError.status === 'number'
    ) {
      const status = rpcError.status;
      return response.status(status).json(rpcError);
    }

    response.status(400).json({
      statusCode: 400,
      message: rpcError.message || 'Bad Request',
    });
  }
}
