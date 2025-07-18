import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [SharedModule, AuthModule],
  controllers: [TodosController],
  providers: [TodosService],
  exports: [TodosService],
})
export class TodosModule {}
