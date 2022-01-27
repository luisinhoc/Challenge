import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CommentAddComponent } from '../comment-add/comment-add.component';
import { CommentEditComponent } from '../comment-edit/comment-edit.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comment: any;
  commentForm: FormGroup = new FormGroup({});
  disabled = true;
  constructor(private modalService: NgbModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      user: ['', Validators.required],
      content: ['', Validators.required],
      parent_id: [this.comment.id],
    });
  }

  openModal() {
    const modalRef = this.modalService.open(CommentAddComponent);
    modalRef.componentInstance.comment = this.comment;
  }

  editModal() {
    const modalRef = this.modalService.open(CommentEditComponent);
    modalRef.componentInstance.comment = this.comment;
  }
}
