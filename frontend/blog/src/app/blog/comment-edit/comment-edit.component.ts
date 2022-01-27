import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PostsService } from 'src/app/core/services/posts.service';

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.scss'],
})
export class CommentEditComponent implements OnInit {
  @Input() comment: any;
  commentEditForm: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private postService: PostsService
  ) {}

  ngOnInit(): void {
    this.commentEditForm = this.fb.group({
      user: [this.comment.user, Validators.required],
      content: [this.comment.content, Validators.required],
      parent_id: [this.comment.parent_id],
    });
  }

  editComment() {
    const newObject = {
      user: this.commentEditForm.get('user')?.value,
      content: this.commentEditForm.get('content')?.value,
      parent_id: this.comment.parent_id,
      date: this.comment.date,
      id: this.comment.id,
      postId: this.comment.postId,
    };
    this.postService
      .editComment(newObject)
      .subscribe(() => this.activeModal.dismiss());
  }
}
