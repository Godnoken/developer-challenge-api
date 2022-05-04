import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommentsNavigationComponent } from './comments-navigation.component';
import { CommentService } from 'src/app/services/comment.service';

describe('CommentsNavigationComponent', () => {
  let component: CommentsNavigationComponent;
  let fixture: ComponentFixture<CommentsNavigationComponent>;
  let commentService: CommentService;
  let commentServiceStub: Partial<CommentService>;


  beforeEach(async () => {
    commentServiceStub = {
      isCreatingComment: false
    }

    await TestBed.configureTestingModule({
      declarations: [CommentsNavigationComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [ { provide: CommentService, useValue: commentServiceStub }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsNavigationComponent);
    component = fixture.componentInstance;
    commentService = TestBed.inject(CommentService);
  });


  it('should create', () => {
    console.log(component)
    expect(component).toBeTruthy();
  });


  it('clicking #commentButton should execute #handleCreateCommentDisplay() and it should toggle #isCreatingComment', () => {
    const commentButton = fixture.debugElement.nativeElement.querySelector('button');
    
    expect(commentService.isCreatingComment)
      .withContext('false at component creation')
      .toBeFalsy();

    commentButton.click();
    expect(commentService.isCreatingComment)
      .withContext('true when clicked')
      .toBeTruthy();

    commentButton.click();
    expect(commentService.isCreatingComment)
      .withContext('false when clicked again')
      .toBeFalsy();
  })
});