import { ArgumentsHost, Catch } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch(RpcException)
export class ExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    // Crear respuesta de error personalizada
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const rpcError: string | object = exception.getError();

    // Convertir correctamente según el tipo
    const errorMessage =
      typeof rpcError === 'string' ? rpcError : JSON.stringify(rpcError);

    if (errorMessage.includes('Empty response')) {
      return response.status(500).json({
        statusCode: 500,
        message: errorMessage.substring(0, errorMessage.indexOf('(') - 1),
      });
    }

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
      message: rpcError || 'Bad Request',
    });
  }
}
