import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { JsonPlaceholderService } from './jsonplaceholder.service';

@Module({
  imports: [HttpModule],
  providers: [JsonPlaceholderService],
  exports: [JsonPlaceholderService],
})
export class SharedModule {}
