import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonBlogComponent } from './common-blog/common-blog.component';
import { SharedRouteModule } from './shared.routing';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { MainModule } from '../components/main.module';
import { ButtonComponent } from '../components/shared/common/button/button.component';
import { AppMainSharedModule } from '../components/shared/common/main-shared.module';



@NgModule({
  declarations: [
    CommonBlogComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    SharedRouteModule,
    FormsModule,
    AppMainSharedModule
  ]
})
export class SharedModule { }
