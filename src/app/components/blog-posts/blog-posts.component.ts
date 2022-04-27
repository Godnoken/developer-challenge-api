import { Component, OnInit } from '@angular/core';
import { BlogPost } from 'src/app/interfaces/blog-post-interface';
import { BlogPostService } from 'src/app/services/blog-post.service';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.scss']
})
export class BlogPostsComponent implements OnInit {
  public blogPosts: BlogPost[] = [];

  constructor(
    private blogPostService: BlogPostService
  ) { }

  ngOnInit(): void {
    this.getBlogPosts();
  }

  getBlogPosts(): void {
    this.blogPostService.getBlogPosts()
      .subscribe((blogPosts) => {
        blogPosts.reverse();
        this.blogPosts = blogPosts;
      })
  }
}
