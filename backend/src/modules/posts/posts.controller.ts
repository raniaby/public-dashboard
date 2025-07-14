import { Controller, Get, Query } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getPosts(@Query('groupByUser') groupByUser?: boolean) {
    return this.postsService.getPosts(groupByUser);
  }

  @Get('summary')
  async getDashboardSummary() {
    return this.postsService.getDashboardSummary();
  }
}
