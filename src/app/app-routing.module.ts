import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBlogPostComponent } from './components/add-blog-post/add-blog-post.component';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { BlogPostsComponent } from './components/blog-posts/blog-posts.component';

const routes: Routes = [
  { path: "**", redirectTo: "/blog", pathMatch: "full" },
  { path: "blog", component: BlogPostsComponent },
  { path: "blog/post/:id", component: BlogPostComponent },
  { path: "add-blog-post", component: AddBlogPostComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
