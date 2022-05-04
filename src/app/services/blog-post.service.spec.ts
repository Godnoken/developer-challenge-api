import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { BlogPostService } from './blog-post.service';

describe('BlogPostService', () => {
  let service: BlogPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(BlogPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
