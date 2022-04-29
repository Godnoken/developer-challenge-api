import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BlogPostComponent } from './blog-post.component';

describe('BlogPostComponent', () => {
  let component: BlogPostComponent;
  let fixture: ComponentFixture<BlogPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogPostComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('#setupPagination should push numbers into #pageButtons equaling amount in #pageCount', () => {
    component.pageCount = 1;
    component.setupPagination();

    expect(component.pageButtons.length).toEqual(1);
    expect(component.pageButtons).toContain(1);
    expect(component.pageButtons).not.toContain(2);

    component.pageCount = 4;
    component.setupPagination();

    expect(component.pageButtons.length).toEqual(4);
    expect(component.pageButtons).toEqual([1, 2, 3, 4]);
  })
});
