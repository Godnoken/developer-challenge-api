import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';

import { BlogPost } from 'src/app/interfaces/blog-post-interface';
import { Comment } from 'src/app/interfaces/comment-interface';
import { BlogPostService } from 'src/app/services/blog-post.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {
  public blogPost!: BlogPost;
  public comments!: Comment[];
  private blogPostId = Number(this.route.snapshot.paramMap.get("id"));

  constructor(
    private route: ActivatedRoute,
    private blogPostService: BlogPostService,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    this.getBlogPost();
  }

  getBlogPost(): void {
    this.blogPostService.getBlogPost(this.blogPostId)
      .pipe(
        finalize(() => {
          this.getComments();
        })
      )
      .subscribe(blogPost => this.blogPost = blogPost);
  }

  getComments(): void {
    this.commentService.getComments(this.blogPostId)
      .subscribe(comments => comments.length > 0 ? this.comments = comments : null);
  }

}
