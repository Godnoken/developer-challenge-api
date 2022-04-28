import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Comment } from 'src/app/interfaces/comment-interface';

@Component({
  selector: 'app-blog-post-comment-navigation',
  templateUrl: './blog-post-comment-navigation.component.html',
  styleUrls: ['./blog-post-comment-navigation.component.scss']
})
export class BlogPostCommentNavigationComponent implements OnInit {
  @Input() blogPostId!: number;
  @Input() comments!: Comment[];
  @Input() currentPage!: number;
  @Input() pageCount!: number;
  @Input() pageButtons!: number[];
  @Input() isCreatingComment!: boolean;
  
  @Output() currentPageChange = new EventEmitter<number>();
  @Output() isCreatingCommentChange = new EventEmitter<boolean>();
  

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  handleCreateCommentDisplay(): void {
    if (this.isCreatingComment === false) {
      this.isCreatingComment = true;
    } else {
      this.isCreatingComment = false;
    }
    
    this.isCreatingCommentChange.emit(this.isCreatingComment);
  }


  navigateByNumbers(event: any): void {
    if (event.target.nodeName === "LI") {
      this.currentPage = Number(event.target.textContent);
      this.currentPageChange.emit(this.currentPage);
      this.navigateToUrl();
    }
  }

  navigateByButtons(event: any): void {
    if (event.target.ariaLabel === "go forward") {
      this.currentPage++;
      this.currentPageChange.emit(this.currentPage);
      this.navigateToUrl();
    } 
    else if (event.target.ariaLabel === "go back") {
      this.currentPage--;
      this.currentPageChange.emit(this.currentPage);
      this.navigateToUrl();
    }
  }

  navigateToUrl(): void {
    this.router.navigateByUrl(`blog/post/${this.blogPostId}/${this.currentPage}`);
  }
}
