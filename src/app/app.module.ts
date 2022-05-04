import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BlogPostsComponent } from './components/blog-posts/blog-posts.component';
import { CommentCardComponent } from './components/comment-card/comment-card.component';
import { BlogPostCardComponent } from './components/blog-post-card/blog-post-card.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { QuoteCommentComponent } from './components/quote-comment/quote-comment.component';
import { CommentsNavigationComponent } from './components/comments-navigation/comments-navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogPostsComponent,
    CommentCardComponent,
    BlogPostCardComponent,
    AddCommentComponent,
    BlogPostComponent,
    QuoteCommentComponent,
    CommentsNavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
