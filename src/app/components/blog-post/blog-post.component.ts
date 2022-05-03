import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, ignoreElements, isEmpty, Observable, of, tap, throwError } from 'rxjs';

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
  public blogPostId = Number(this.route.snapshot.paramMap.get("id"));
  public blogPost$!: Observable<BlogPost>;
  public comments!: Comment[];
  public comments$!: Observable<Comment[]>;
  public currentPage = Number(this.route.snapshot.paramMap.get("commentPage"));
  public paginatedComments!: Comment[];
  public rows: number = 5;
  public pageCount: number = 0;
  public pageButtons: number[] = [];
  public blogPostLoadError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private blogPostService: BlogPostService,
    public commentService: CommentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getBlogPost();
    this.getComments();
  }

  getBlogPost(): void {
    this.blogPostService.getBlogPosts$
      .pipe(
        catchError(() => {
          this.blogPostLoadError = true
          return of();
        })
      )
      .subscribe((blogPosts) => {
        blogPosts.find((blogPost) => {
          if (blogPost.id === this.blogPostId) {
            this.blogPost$ = of(blogPost);
          }
          
          // If blogpost couldn't be found in cache, display error
          else if (!this.blogPost$ && blogPost === blogPosts[blogPosts.length - 1]) {
            this.blogPostLoadError = true;
          }
        })
      })
  }


  getComments(): void {
   this.commentService.getComments(this.blogPostId);
   this.comments$ = this.commentService.getComments$
      .pipe(
        catchError(error => {
          console.error(error);
          return of();
        }),
        tap((comments) => {
          this.comments = comments;

          this.displayCurrentPageComments(this.comments, this.rows, this.currentPage);
          this.pageCount = Math.ceil(this.comments.length / this.rows);
          this.setupPagination();
        })
      )
  }


  displayNewComment(): void {
    this.commentService.isCreatingComment = false
    const amountOfPagesNewCommentIncluded = Math.ceil((this.comments.length) / this.rows);

    if (amountOfPagesNewCommentIncluded > this.pageCount) {
      this.pageCount = amountOfPagesNewCommentIncluded;
      this.currentPage = this.pageCount;
      this.displayCurrentPageComments(this.comments, this.rows, this.currentPage);
      this.setupPagination();
      this.router.navigateByUrl(`blog/post/${this.blogPostId}/${this.pageCount}`);
    }
    else {
      if (this.currentPage !== this.pageCount) {
        this.currentPage = this.pageCount;
        this.displayCurrentPageComments(this.comments, this.rows, this.currentPage);
        this.router.navigateByUrl(`blog/post/${this.blogPostId}/${this.pageCount}`);
      }
      else {
        this.paginatedComments.push(this.comments[this.comments.length - 1]);
      }
    }
  }


  displayCurrentPageComments(items: any, rowsPerPage: any, page: any) {
    // Read from 0 (array)
    page--;

    // Slice (rowsPerPage) amount of items from comments array & display them through paginatedComments
    let start = rowsPerPage * page;
    let end = start + rowsPerPage;
    this.paginatedComments = items.slice(start, end);
  }



  // Create pagebuttons
  setupPagination() {
    // Reset display
    this.pageButtons = [];

    // Set & add amount of pageButtons to display
    for (let i = 1; i < this.pageCount + 1; i++) {
      this.pageButtons.push(i);
    }
  }
}
