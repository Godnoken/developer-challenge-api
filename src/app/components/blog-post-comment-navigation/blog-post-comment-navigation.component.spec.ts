import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BlogPostCommentNavigationComponent } from './blog-post-comment-navigation.component';

describe('BlogPostCommentNavigationComponent', () => {
  let component: BlogPostCommentNavigationComponent;
  let fixture: ComponentFixture<BlogPostCommentNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogPostCommentNavigationComponent],
      imports: [RouterTestingModule]
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


  it('clicking #commentButton should execute #handleCreateCommentDisplay() and it should toggle #isCreatingComment', () => {
    const commentButton = fixture.debugElement.nativeElement.querySelector('button');

    // Execute once at init due to #isCreatingComment being an input with no inital value in the testing environment
    commentButton.click();
    expect(component.isCreatingComment)
      .withContext('false at component creation')
      .toBeFalsy();

    commentButton.click();
    expect(component.isCreatingComment)
      .withContext('true when clicked')
      .toBeTruthy();

    commentButton.click();
    expect(component.isCreatingComment)
      .withContext('false at component creation')
      .toBeFalsy();
  })
});