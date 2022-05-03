import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/interfaces/comment-interface';

@Component({
  selector: 'app-quote-comment',
  templateUrl: './quote-comment.component.html',
  styleUrls: ['./quote-comment.component.scss']
})
export class QuoteCommentComponent implements OnInit {
  @Input() quotedComment!: Comment;

  constructor() { }

  ngOnInit(): void {
  }

}
