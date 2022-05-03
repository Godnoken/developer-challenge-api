import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { BlogPost } from '../interfaces/blog-post-interface';
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {
  private apiUrl = "http://localhost:9000";

  constructor(
    private http: HttpClient
  ) { }

  // ShareReply caches data so user doesn't need to request data over and over again when browsing
  getBlogPosts$ = this.http.get<BlogPost[]>(`${this.apiUrl}/posts`).pipe(shareReplay(1));

}
