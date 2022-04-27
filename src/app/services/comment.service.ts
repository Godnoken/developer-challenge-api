import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Comment } from '../interfaces/comment-interface';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = "http://localhost:9000";

  constructor(
    private http: HttpClient
  ) { }

    getComments(blogPostId: number): Observable<Comment[]> {
      return this.http.get<Comment[]>(`${this.apiUrl}/comments`)
        .pipe(
          map(comments => comments.filter(comment => comment.postId === blogPostId))
        )
    }

}
