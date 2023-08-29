import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonBlogComponent } from './common-blog/common-blog.component';
import { SharedRouteModule } from './shared.routing';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CommonBlogComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    SharedRouteModule,
    FormsModule
  ]
})
export class SharedModule { }
