import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonBlogComponent } from './common-blog/common-blog.component';


const routes: Routes = [
  {path: ':name', component: CommonBlogComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRouteModule { }
