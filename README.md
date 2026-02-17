# Cliente Gateway

El gateway es el punto de comunicación entre nuestros clientes y nuestros servicios. Es el encargado de recibir las peticiones, enviarlas a los servicios correspondientes y devolver la respuesta al cliente.

## Dev

- Clonar el repositorio
- Instalar dependencias
- Crear un archivo `.env` basado en el `env.template`
- Levantar el servidor de NATS:

  ```bash
    docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats
  ```

- Tener levantados los microservicios que se van a consumir
- Levantar proyecto con `npm run start:dev`
