import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/interfaces/comment-interface';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {
  @Input() comment!: Comment;
  public quotedComment!: Comment;

  constructor(
    public commentService: CommentService
  ) { }

  ngOnInit(): void {
    if (this.comment.parentId !== null) this.findQuotedComment();
  }

  findQuotedComment(): void {
    this.commentService.getComments$
      .subscribe((comments) => {
        comments.find((comment) => {
          if (comment.id === this.comment.parentId) {
            this.quotedComment = comment;
          }
        })
      })
  }

  quoteComment(): void {
    this.commentService.isCreatingComment = true;
    this.commentService.quotedComment = this.comment;
  }
}
