import { Injectable } from '@nestjs/common';
import { JsonPlaceholderService } from '../../shared/jsonplaceholder.service';
import {
  Post,
  PostsByUser,
  PostSummary,
} from '../../shared/types/jsonplaceholder.types';

@Injectable()
export class PostsService {
  constructor(
    private readonly jsonPlaceholderService: JsonPlaceholderService,
  ) {}

  async getPosts(groupByUser = false): Promise<Post[] | PostsByUser[]> {
    const posts = await this.jsonPlaceholderService.getPosts();

    if (!groupByUser) {
      return posts;
    }

    return this.groupPostsByUser(posts);
  }

  async getDashboardSummary(): Promise<PostSummary[]> {
    const [posts, users] = await Promise.all([
      this.jsonPlaceholderService.getPosts(),
      this.jsonPlaceholderService.getUsers(),
    ]);

    const postsByUser = this.groupPostsByUser(posts);

    return users.map((user) => {
      const userPosts =
        postsByUser.find((p) => p.userId === user.id)?.posts || [];
      return {
        userId: user.id,
        userName: user.name,
        shortName: user.name.split(' ')[0],
        postsCount: userPosts.length,
      };
    });
  }

  private groupPostsByUser(posts: Post[]): PostsByUser[] {
    const postsByUser = new Map<number, Post[]>();

    for (const post of posts) {
      if (!postsByUser.has(post.userId)) {
        postsByUser.set(post.userId, []);
      }
      postsByUser.get(post.userId)!.push(post);
    }

    return Array.from(postsByUser.entries()).map(([userId, posts]) => ({
      userId,
      posts,
    }));
  }
}
