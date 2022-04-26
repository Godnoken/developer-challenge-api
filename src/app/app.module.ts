import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogPostsComponent } from './components/blog-posts/blog-posts.component';
import { CommentCardComponent } from './components/comment-card/comment-card.component';
import { BlogPostCardComponent } from './components/blog-post-card/blog-post-card.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { AddBlogPostComponent } from './components/add-blog-post/add-blog-post.component';
import { QuoteCommentComponent } from './components/quote-comment/quote-comment.component';
import { BlogPostCommentNavigationComponent } from './components/blog-post-comment-navigation/blog-post-comment-navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogPostsComponent,
    CommentCardComponent,
    BlogPostCardComponent,
    AddCommentComponent,
    BlogPostComponent,
    AddBlogPostComponent,
    QuoteCommentComponent,
    BlogPostCommentNavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
