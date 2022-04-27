import { Component, Input, OnInit } from '@angular/core';
import { BlogPost } from 'src/app/interfaces/blog-post-interface';

@Component({
  selector: 'app-blog-post-card',
  templateUrl: './blog-post-card.component.html',
  styleUrls: ['./blog-post-card.component.scss']
})
export class BlogPostCardComponent implements OnInit {
  @Input() blogPost!: BlogPost;

  constructor() { }

  ngOnInit(): void {
  }

}
