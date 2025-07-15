import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { json as expressJson, urlencoded as expressUrlEncoded } from 'express';
import { AllConfigType } from './conf/types/config.type';
import { ResolvePromisesInterceptor } from './utils/serializer.interceptor';
import validationOptions from './utils/validateOptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService<AllConfigType>);

  app.use(expressJson({ limit: '50mb' }));
  app.use(expressUrlEncoded({ limit: '50mb', extended: true }));

  app.enableCors({
    origin: ["https://app.raniabys.me"],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });

  app.enableShutdownHooks();

  app.useGlobalInterceptors(
    // ResolvePromisesInterceptor is used to resolve promises in responses because class-transformer can't do it
    // https://github.com/typestack/class-transformer/issues/549
    new ResolvePromisesInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe(validationOptions));

  const port = configService.getOrThrow('app.apiPort', { infer: true });
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
  Logger.log(`🚀 Application env is: ${process.env.NODE_ENV}`);
  // bootstrapMetrics()
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
