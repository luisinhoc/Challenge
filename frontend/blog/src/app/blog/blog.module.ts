import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommentAddComponent } from './comment-add/comment-add.component';
import { CommentComponent } from './comment/comment.component';
import { CommentEditComponent } from './comment-edit/comment-edit.component';
import { FooterComponent } from '../core/components/footer/footer.component';
import { HeaderComponent } from '../core/components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PostComponent } from './post/post.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { sanitizeHtmlPipe } from '../core/pipes/html-sanitizer.pipe';

@NgModule({
  declarations: [
    BlogComponent,
    PostComponent,
    HeaderComponent,
    FooterComponent,
    PostsListComponent,
    sanitizeHtmlPipe,
    CommentComponent,
    CommentEditComponent,
    CommentAddComponent,
  ],
  imports: [
    BlogRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule,
    NgbModule,
  ],
  providers: [NgbActiveModal],
})
export class BlogModule {}
