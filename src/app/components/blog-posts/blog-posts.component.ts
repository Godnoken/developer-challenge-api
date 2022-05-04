import { Component, OnInit } from '@angular/core';
import { catchError, ignoreElements, Observable, of } from 'rxjs';

import { BlogPost } from 'src/app/interfaces/blog-post-interface';
import { BlogPostService } from 'src/app/services/blog-post.service';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.scss']
})
export class BlogPostsComponent implements OnInit {
  public blogPosts$!: Observable<BlogPost[]>;
  public blogPostsError$!: Observable<BlogPost[]>;

  constructor(
    private blogPostService: BlogPostService
  ) { }

  ngOnInit(): void {
    this.getBlogPosts();
  }

  getBlogPosts(): void {
    this.blogPosts$ = this.blogPostService.getBlogPosts$;
    this.blogPostsError$ = this.blogPosts$
      .pipe(
        ignoreElements(),
        catchError((error) => of(error)),
      )
  }
}