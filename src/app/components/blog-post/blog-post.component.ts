import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  public blogPostId = Number(this.route.snapshot.paramMap.get("id"));
  public blogPost!: BlogPost;
  public comments: Comment[] = [];
  public currentPage = Number(this.route.snapshot.paramMap.get("commentPage"));
  public paginatedComments!: Comment[];
  public rows: number = 2;
  public pageCount: number = 0;
  public pageButtons: number[] = [];
  public isCreatingComment = false;

  constructor(
    private route: ActivatedRoute,
    private blogPostService: BlogPostService,
    private commentService: CommentService,
    private router: Router
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
      .pipe(
        finalize(() => {
          this.displayCurrentPageComments(this.comments, this.rows, this.currentPage);
          this.pageCount = Math.ceil(this.comments.length / this.rows);
          this.setupPagination();
        })
      )
      .subscribe(comments => comments.length > 0 ? this.comments = comments : null);
  }


  displayNewComment(): void {
    this.isCreatingComment = false
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

    // Slice 5 items from comments array & display them through paginatedComments
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
