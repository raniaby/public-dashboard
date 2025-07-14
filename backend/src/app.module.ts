import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { TodosModule } from './modules/todos/todos.module';
import appConfig from './conf/app.config';
import keycloakConfig from './modules/auth/config/keycloak.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, keycloakConfig],
      envFilePath: ['.env'],
    }),
    AuthModule,
    SharedModule,
    UsersModule,
    PostsModule,
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
