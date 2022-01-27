import { Observable, Subject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from 'src/app/shared/models/post.model';
import { PostComment } from 'src/app/shared/models/post-comment.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private urlApi = environment.urlApi;
  private newComment = new Subject<any>();
  constructor(private http: HttpClient) {}

  getAllPost(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.urlApi}/posts`);
  }

  getNewcomment() {
    return this.newComment;
  }

  setNewcomment(comment: any) {
    this.newComment.next(comment);
  }

  getPostById(slug: string): Observable<Post> {
    const id = slug.split('-');
    return this.http.get<Post>(`${this.urlApi}/posts/${id[2]}`);
  }

  addComment(comment: PostComment): Observable<Post> {
    return this.http.post<Post>(
      `${this.urlApi}/posts/${comment.postId}/comments`,
      comment
    );
  }

  editComment(comment: PostComment): Observable<Post> {
    return this.http.put<Post>(
      `${this.urlApi}/comments/${comment.id}`,
      comment
    );
  }

  getComments(id: number): Observable<PostComment> {
    return this.http.get<PostComment>(`${this.urlApi}/posts/${id}/comments`);
  }
}
