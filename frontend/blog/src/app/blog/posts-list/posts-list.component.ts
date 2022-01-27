import { Component, OnInit } from '@angular/core';

import { Post } from 'src/app/shared/models/post.model';
import { PostsService } from 'src/app/core/services/posts.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {
  posts: Post[] = [];
  constructor(private postService: PostsService) {}

  ngOnInit(): void {
    this.postService.getAllPost().subscribe({
      next: (posts: Post[]) => {
        this.posts = posts.sort((a, b) => {
          return a.publish_date ? -1 : b.publish_date ? 1 : 0;
        });
      },
    });
  }
}
