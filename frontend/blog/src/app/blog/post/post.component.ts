import * as _ from 'lodash';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { CommentAddComponent } from '../comment-add/comment-add.component';
import { CommentEditComponent } from '../comment-edit/comment-edit.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Post } from 'src/app/shared/models/post.model';
import { PostComment } from 'src/app/shared/models/post-comment.model';
import { PostsService } from 'src/app/core/services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  post: Post | undefined;
  postId!: number;
  postComments: any[] = [];
  commentForm = this.fb.group({
    user: ['', Validators.required],
    content: ['', Validators.required],
    parent_id: [null],
  });
  constructor(
    private route: ActivatedRoute,
    private postService: PostsService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    const params: any = this.route.snapshot.params;
    this.postId = Number(params.postslug.split('-')[2]);
    this.postService.getPostById(params.postslug).subscribe({
      next: (postResponse: Post) => {
        this.post = postResponse;
        this.getComments();
      },
    });
    this.postService.getNewcomment().subscribe({
      next: (res) => {
        this.addComment(res);
      },
    });
  }

  addComment(event?: any) {
    let newObject: PostComment;
    if (event) {
      newObject = {
        ...event,
        date: this.getCurrentDate(),
        postId: this.postId,
      };
    } else {
      newObject = {
        user: this.commentForm.get('user')?.value,
        content: this.commentForm.get('content')?.value,
        date: this.getCurrentDate(),
        postId: Number(this.postId),
        parent_id: this.commentForm.get('parent_id')?.value,
      };
    }
    this.postService.addComment(newObject).subscribe({
      next: () => {
        this.getComments();
      },
    });

    this.commentForm.reset();
  }

  openModal(comment: any) {
    const modalRef = this.modalService.open(CommentAddComponent);
    modalRef.componentInstance.comment = comment;
  }

  editModal(comment: any) {
    const modalRef = this.modalService.open(CommentEditComponent);
    modalRef.componentInstance.comment = comment;
    modalRef.dismissed.subscribe(() => this.getComments());
  }

  getchilds(id: number) {
    return this.postComments.filter((m) => m.parent_id === id);
  }

  createChild(list: string | any[]) {
    let map: any = {},
      node,
      roots = [],
      i;

    for (i = 0; i < list.length; i += 1) {
      map[list[i].id] = i; // initialize the map
      list[i].children = []; // initialize the children
    }

    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.parent_id !== null) {
        // if you have dangling branches check that map[node.parentId] exists
        if (list[map[node.parent_id]]?.children) {
          list[map[node.parent_id]]?.children.push(node);
        } else {
          list[map[node.parent_id]]['children'] = [];
          list[map[node.parent_id]]?.children.push(node);
        }
      } else {
        roots.push(node);
      }
    }
    return roots;
  }

  getCurrentDate() {
    const t = new Date();
    const date = ('0' + t.getDate()).slice(-2);
    const month = ('0' + (t.getMonth() + 1)).slice(-2);
    const year = t.getFullYear();
    return `${year}-${month}-${date}`;
  }

  getComments() {
    this.postService.getComments(this.postId).subscribe({
      next: (comments: any) => {
        this.postComments = comments.sort((a: any, b: any) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        this.postComments = this.createChild(this.postComments);
      },
    });
  }
}
