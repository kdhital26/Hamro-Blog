import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BlogModel } from '../models/add-blog-model';
import { AddBlogService } from '../services/add-blog.service';

@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrls: ['./list-blog.component.scss']
})
export class ListBlogComponent implements OnInit {
  public destroyed$ = new Subject<boolean>();
  public blogListData: any[] = [];
  public filePath = environment.filePath;
  public showBlogView: boolean = false;
  public blogData: any;

  constructor(
    private blogService: AddBlogService
  ) { }

  ngOnInit(): void {
    this.getAllBlogLis();
  }

  getAllBlogLis() {
    this.blogService.getAllBlogs()
    .pipe(takeUntil(this.destroyed$))
    .subscribe((result: any) => {
      const { body: {data} } = result;
      for(let i = 0; i < data.length; i++){
        let splitedFile = data[i].file.split(',');
        data[i]['splitedFiles'] = splitedFile;
        data[i]['description'] = data[i]['description'].replace(`${environment.splitTag}`, ' ');
      }
      this.blogListData = data;
    }, error => {
      console.log(error);
    });
  }

  delete(data: BlogModel) {
    this.blogService.deleteBlog(data)
    .pipe(takeUntil(this.destroyed$))
    .subscribe((result: any) => {
      if(result.body.message === 'Deleted Successfully') {
        this.getAllBlogLis();
      }
    })
  }

  editBlog(data: any, i: number) {
    this.blogData = data;
    this.addBlog();
  }

  addBlog() {
    this.showBlogView = !this.showBlogView;
  }

  back() {
    this.addBlog();
    this.getAllBlogLis();
  }

}
