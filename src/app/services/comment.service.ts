import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  private port = ( window.location.hostname === 'localhost' ) ? ':8080' : '';
  public apiUrl = `${window.location.protocol}//${window.location.hostname}${this.port}/api`;
  public getComments$!: Observable<Comment[]>;
  public isCreatingComment: boolean = false;
  public quotedComment!: Comment | null;

  constructor(
    private http: HttpClient
  ) { }

  getComments(blogPostId: number): void {
    this.getComments$ = this.http.get<Comment[]>(`${this.apiUrl}/posts/${blogPostId}/comments`);
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/comments`, comment, httpOptions);
  }
}