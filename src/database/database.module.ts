import { Module, Global } from '@nestjs/common';

const API_KEY_DEV = '12345667';
const API_KEY_PROD = '2432432';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      // Se asigna el valor de la API_KEY dependiendo del entorno. Si el entorno es 'prod',
      // se usa la clave API_KEY_PROD; de lo contrario, se utiliza API_KEY_DEV.
      // Esto permite manejar diferentes configuraciones según el entorno de ejecución.
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY_DEV,
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
