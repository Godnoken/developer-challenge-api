import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentCardComponent } from './comment-card.component';

describe('CommentCardComponent', () => {
  let component: CommentCardComponent;
  let fixture: ComponentFixture<CommentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentCardComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentCardComponent);
    component = fixture.componentInstance;
    component.comment = mockComment;
    fixture.detectChanges();
  });

  const mockComment = {
    postId: 1,
    parentId: null,
    user: "Seb",
    content: "Bla bla bla",
    date: "2016-02-23",
  }
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('template should contain #comment.user, #comment.content, #comment.date', () => {
    const user = fixture.debugElement.nativeElement.querySelector('h3');
    const contentAndDate = fixture.debugElement.nativeElement.querySelectorAll('p');

    expect(user.textContent).toEqual(mockComment.user);
    expect(contentAndDate[0].textContent).toEqual(mockComment.content);
    expect(contentAndDate[1].textContent).toEqual(mockComment.date);
  })
});
