import { HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounce, debounceTime, forkJoin, Subject, take, takeUntil } from 'rxjs';
import { AddBlogService } from 'src/app/components/services/add-blog.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit {
  public destroye$ = new Subject<any>();
  public blogList: any[] = [];
  public filePath: string = environment.filePath;
  constructor(
    private route: Router,
    private activateRoute: ActivatedRoute,
    private addBlogService: AddBlogService,
  ) { }
  blogContent: any[] = []
  ngOnInit(): void {
    this.getAllBlogs();
    this.getAllTopic();
  }

  /*
   get all added blogs here
   */
   getAllBlogs() {
    this.addBlogService.getAllBlogs()
    .pipe(takeUntil(this.destroye$))
    .subscribe((result: any) => {
      const {body: {data}} = result;
      for(let i = 0; i < data.length; i++) {
        data[i].description = data[i].description.split(environment.splitTag);
        data[i].imagePath = data[i].file.split(',');
      }
      this.blogList = data;

    }, error => {
      console.log(error);
    })
   }

   getAllTopic() {
    let trendingTopic = this.addBlogService.getAllTrendingTopic();
    forkJoin([trendingTopic]).pipe(takeUntil(this.destroye$))
    .subscribe(trendingTopicResult => {
      this.loadData(trendingTopicResult[0], 'trendingTopic')
    }, error => {
      console.log(error, 'error');
    })
   }

   loadData(value: any, type?: string) {
    console.log(value);

    if(type === 'trendingTopic') {
      let { body: {data} } = value;
      this.blogContent = data;
    }
   }

   loadError(error: HttpErrorResponse) {

   }

  gotoBlog(data: any) {
    let split = data?.title?.split(' ')?.join('-')?.toString()?.toLowerCase();
    this.route.navigate([`/blog/${split}`], {queryParams: {id: data._id}});
  }

}
