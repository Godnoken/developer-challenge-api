import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { BlogPostsComponent } from './components/blog-posts/blog-posts.component';

const routes: Routes = [
  { path: "blog", component: BlogPostsComponent },
  { path: "blog/post/:id/:commentPage", component: BlogPostComponent },
  { path: "**", redirectTo: "/blog", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
