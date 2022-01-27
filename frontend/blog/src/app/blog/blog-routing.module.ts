import { RouterModule, Routes } from '@angular/router';

import { BlogComponent } from './blog.component';
import { NgModule } from '@angular/core';
import { PostComponent } from './post/post.component';
import { PostsListComponent } from './posts-list/posts-list.component';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [
      {
        path: '',
        component: PostsListComponent,
      },
      {
        path: 'posts/:postslug',
        component: PostComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
