import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteCommentComponent } from './quote-comment.component';

const mockData = {
    "id": 1,
    "postId": 1,
    "parentId": null,
    "user": "Amelia",
    "date": "2016-02-23",
    "content": "Nulla in nulla vel nisi faucibus scelerisque. Donec quis tortor."
}

describe('QuoteCommentComponent', () => {
  let component: QuoteCommentComponent;
  let fixture: ComponentFixture<QuoteCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  

  it('if quotedComment exists, a paragraph element should exist in template', () => {
    // Read for a paragraph element
    let paragraphElement = fixture.debugElement.nativeElement.querySelector('p');

    expect(paragraphElement)
      .withContext('Paragraph should not exist before a quotedComment exists on component')
      .toBeFalsy();

    // Pass data
    component.quotedComment = mockData;
    fixture.detectChanges();

    // Reread for paragraph a element
    paragraphElement = fixture.debugElement.nativeElement.querySelector('p');
    
    expect(paragraphElement)
      .withContext('At least one paragraph should exist after a quotedComment is passed to component')
      .toBeTruthy();
  })
});
