import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { MainRoutingModule } from './main-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ButtonComponent } from './shared/button/button.component';
import { ListBlogComponent } from './list-blog/list-blog.component';
import { AppMainSharedModule } from './shared/button/main-shared.module';



@NgModule({
  declarations: [
    AddBlogComponent,
    // ButtonComponent,
    ListBlogComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    AppMainSharedModule
  ],
  // exports : [
  //   ButtonComponent
  // ]
})
export class MainModule { 

}
