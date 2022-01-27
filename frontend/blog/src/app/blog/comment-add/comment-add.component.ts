import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PostsService } from 'src/app/core/services/posts.service';

@Component({
  selector: 'app-comment-add',
  templateUrl: './comment-add.component.html',
  styleUrls: ['./comment-add.component.scss'],
})
export class CommentAddComponent implements OnInit {
  @Input() comment: any;
  commentForm: FormGroup = new FormGroup({});
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private postService: PostsService
  ) {}

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      user: ['', Validators.required],
      content: ['', Validators.required],
      parent_id: [this.comment.id],
    });
  }

  addComment(comment: any) {
    const newObject = {
      user: this.commentForm.get('user')?.value,
      content: this.commentForm.get('content')?.value,
      parent_id: comment.id,
    };
    this.postService.setNewcomment(newObject);
    this.activeModal.dismiss();
  }
}
