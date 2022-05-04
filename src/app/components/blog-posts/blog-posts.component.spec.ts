import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BlogPostService } from 'src/app/services/blog-post.service';

import { BlogPostsComponent } from './blog-posts.component';

describe('BlogPostsComponent', () => {
  let component: BlogPostsComponent;
  let fixture: ComponentFixture<BlogPostsComponent>;
  let blogPostService: BlogPostService;
  let blogPostServiceStub: Partial<BlogPostService>;

  beforeEach(async () => {

    blogPostServiceStub = {
      getBlogPosts$: of([
        {
          "id": 9,
          "title": "Blog post #9",
          "author": "Myron Montford",
          "publish_date": "2016-10-11",
          "slug": "blog-post-9",
          "description": "Ius ad verear tincidunt scriptorem, vel et libris saperet invidunt.",
          "content": "<p>Ius ad verear tincidunt scriptorem, vel et libris saperet invidunt. No assum maiorum per. Purto tamquam labores has ex. Eu aliquid interpretaris vel, eos tale rebum dolore in.</p>"
        },
        {
          "id": 10,
          "title": "Blog post #10",
          "author": "Tandy Thiem",
          "publish_date": "2016-11-29",
          "slug": "blog-post-10",
          "description": "Natum integre tractatos eu duo, ut falli scriptorem qui.",
          "content": "<p>Natum integre tractatos eu duo, ut falli scriptorem qui. Probo inermis ad nec, petentium inciderint mei in.</p> <p>Quidam inermis detraxit per ea. Vix etiam eirmod ut, sea dolor appellantur te. Te quis dicit delicata eum, in has convenire interesset.</p>"
        }
      ])
    }

    await TestBed.configureTestingModule({
      declarations: [BlogPostsComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: BlogPostService, useValue: blogPostServiceStub }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostsComponent);
    component = fixture.componentInstance;
    blogPostService = TestBed.inject(BlogPostService);
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('blogPosts$ should contain 2 blog posts', () => {
    blogPostService.getBlogPosts$
      .subscribe((blogPosts) => {
        expect(blogPosts.length).toEqual(2);
      })
  })

});
