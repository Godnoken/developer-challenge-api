import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostCommentNavigationComponent } from './blog-post-comment-navigation.component';

describe('BlogPostCommentNavigationComponent', () => {
  let component: BlogPostCommentNavigationComponent;
  let fixture: ComponentFixture<BlogPostCommentNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogPostCommentNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostCommentNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
