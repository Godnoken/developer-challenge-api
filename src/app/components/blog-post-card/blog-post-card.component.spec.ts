import { Directive, HostListener, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BlogPostCardComponent } from './blog-post-card.component';


let linkDes: any;
let routerLinks: any;

const mockData = {
  "id": 10,
  "title": "Blog post #10",
  "author": "Tandy Thiem",
  "publish_date": "2016-11-29",
  "slug": "blog-post-10",
  "description": "Natum integre tractatos eu duo, ut falli scriptorem qui.",
  "content": "<p>Natum integre tractatos eu duo, ut falli scriptorem qui. Probo inermis ad nec, petentium inciderint mei in.</p> <p>Quidam inermis detraxit per ea. Vix etiam eirmod ut, sea dolor appellantur te. Te quis dicit delicata eum, in has convenire interesset.</p>"
}

@Directive({
  selector: '[routerLink]'
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  @HostListener('click')
  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

describe('BlogPostCardComponent', () => {
  let component: BlogPostCardComponent;
  let fixture: ComponentFixture<BlogPostCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogPostCardComponent, RouterLinkDirectiveStub],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostCardComponent);
    component = fixture.componentInstance;
    component.blogPost = mockData;
    fixture.detectChanges();
    
    linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
    routerLinks = linkDes.map((de: any) => de.injector.get(RouterLinkDirectiveStub));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('clicking on a blog-post-card should tell router to navigate to that specific blog post', () => {
    const routerLinkAnchor = linkDes[0];
    
    routerLinkAnchor.triggerEventHandler('click', null);

    expect(routerLinks[0].navigatedTo).toBe(`post/${component.blogPost.id}/1`);
  })
});
