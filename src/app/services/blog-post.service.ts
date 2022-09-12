import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs';

import { BlogPost } from '../interfaces/blog-post-interface';


@Injectable({
  providedIn: 'root'
})
export class BlogPostService {
  private port = ( window.location.hostname === 'localhost' ) ? ':8080' : '';
  public apiUrl = `${window.location.protocol}//${window.location.hostname}${this.port}/api`;

  constructor(
    private http: HttpClient
  ) { }

  // ShareReply caches data so user doesn't need to request data over and over again when browsing
  getBlogPosts$ = this.http.get<BlogPost[]>(`${this.apiUrl}/posts`).pipe(shareReplay(1));

}
