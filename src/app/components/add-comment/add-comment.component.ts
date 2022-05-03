import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { Comment } from 'src/app/interfaces/comment-interface';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  @Input() comments!: Comment[];
  @Input() blogPostId!: number;

  @Output() emitAddedComment = new EventEmitter();

  private textarea!: HTMLInputElement;

  constructor(
    public commentService: CommentService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.textarea = this.renderer.selectRootElement(".comment-content", true);
    this.autoFocusName();
  }

  ngOnDestroy(): void {
    this.commentService.quotedComment = null;
    this.commentService.isCreatingComment = false;
  }

  commentForm = new FormGroup({
    user: new FormControl('', {
      validators: [
        Validators.required
      ]
    }),
    content: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(5)
      ]
    })
  }, { updateOn: "submit" })

  get user() { return this.commentForm.get('user')! };
  get content() { return this.commentForm.get('content')! };

  addComment(): void {
    if (this.commentForm.valid) {

      const comment: Comment = {
        postId: this.blogPostId,
        ...(this.commentService.quotedComment ? { parentId: this.commentService.quotedComment.id! } : { parentId: null }),
        user: this.user.value,
        date: this.getCurrentDate(),
        content: this.content.value,
      }

      this.commentService.addComment(comment)
        .pipe(
          finalize(() => {
            this.emitAddedComment.emit();
          })
        )
        .subscribe(comment => this.comments.push(comment))
    }
  }

  autoGrowSize(): void {
    this.textarea.style.height = "auto";
    this.textarea.style.height = `${this.textarea.scrollHeight}px`;
  }

  getCurrentDate(): string {
    const currentDate = new Date();

    const date = currentDate.toLocaleDateString("en-SE", {
      year: "numeric",
      month: "numeric",
      day: "numeric"
    })

    return date;
  }

  autoFocusName(): void {
    const name = this.renderer.selectRootElement(".comment-user", true);
    name.focus();
  }
}
