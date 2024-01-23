import { HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounce, debounceTime, forkJoin, Subject, take, takeUntil } from 'rxjs';
import { AddBlogService } from 'src/app/components/services/add-blog.service';
import { environment } from 'src/environments/environment';
import { CommenModel } from '../model/common.model';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit {
  public destroye$ = new Subject<any>();
  public blogList: any[] = [];
  public loaderCount = [1,2,3,4,5];
  public filePath: string = environment.filePath;
  public commonModel = new CommenModel();
  constructor(
    private route: Router,
    private activateRoute: ActivatedRoute,
    private addBlogService: AddBlogService,
  ) { }
  blogContent: any[] = []
  latestTopic: any[] = []
  ngOnInit(): void {

    this.getAllBlogs();
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
        data[i].imagePath = data[i].cloudinaryPath.split(',');
      }
      this.blogList = data;
      this.getAllTopic();
      this.getLatesTopic();
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

   getLatesTopic() {
      this.addBlogService.getLatestTopic(this.commonModel)
      .pipe(takeUntil(this.destroye$))
      .subscribe(result => {
        this.loadData(result, 'getLatest')
      }, error => {
        this.loadError(error);
      })
   }

   loadData(value: any, type?: string) {
    let { body: {data} } = value;
    if(type === 'trendingTopic') {
      this.blogContent = data;
    } else if(type === 'getLatest') {
      for(let i = 0; i < data.length; i++) {
        data[i].imagePath = data[i].cloudinaryPath.split(',');
      }
      this.latestTopic = data;

      console.log(this.latestTopic, 'top')
    }
   }

   loadError(error: HttpErrorResponse) {

   }

  gotoBlog(data: any) {
    let split = data?.title?.split(' ')?.join('-')?.toString()?.toLowerCase();
    this.route.navigate([`/blog/${split}`], {queryParams: {id: data._id}});
  }

}
