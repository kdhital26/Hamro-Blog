import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CommentModel, RatingModel } from 'src/app/components/models/rating.model';
import { AddBlogService } from 'src/app/components/services/add-blog.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-common-blog',
  templateUrl: './common-blog.component.html',
  styleUrls: ['./common-blog.component.scss']
})
export class CommonBlogComponent implements OnInit, OnDestroy, AfterViewInit {
  destroyed$ = new Subject<boolean>();
  name: string = '';
  _id: string  = '';
  blogData: any;
  comment: string  = '';
  filePath = environment.filePath;
  comments: any[] = [];
  showloader = true;
  starRating = [
    {setRating: false, number: 1},
    {setRating: false, number: 2},
    {setRating: false, number: 3},
    {setRating: false, number: 4},
    {setRating: false, number: 5},
  ]
  constructor(
    private activateRoute: ActivatedRoute,
    private blogService: AddBlogService,
    private route: Router,

  ) { }
  
  ngOnInit(): void {
    this.name = this.activateRoute.snapshot.params['name'];
    this.activateRoute.queryParams.subscribe(res => {
      this._id = res['id'];
    });
  }

  ngAfterViewInit(): void {
    this.getBlog();
  }

  getBlog() {
    this.showloader = true;
    this.blogService.getBlogById(this._id)
    .pipe(takeUntil(this.destroyed$))
    .subscribe((result: any) => {
      this.showloader = false;
      const { data, comments } = result;
      if(data) {
        this.blogData = data;
        console.log(this.blogData, comments)
        this.comments = comments;
        // this.getAllRatingById();
      }
    }, error => {
      this.loadError(error)
    });

  }
 
  isRateSet = false;
  saveRating(value: number) {
    let ratingModel = new RatingModel(this._id, value);
    this.blogService.setRating(ratingModel)
    .pipe(takeUntil(this.destroyed$))
    .subscribe(result => {
      this.isRateSet = true;
    }, error => {
      this.loadError(error);
      this.isRateSet = false;
    })
  }
  disabled = false

  createComments() {
    if(!this.comment) return;
    let commentModel = new CommentModel(this._id, this.comment);
    this.blogService.createComment(commentModel)
    .pipe(takeUntil(this.destroyed$))
    .subscribe(result => {
      if(result) {
        this.comment = '';
        this.getBlog();
      }
    }, error => {
      this.loadError(error)
    })
  }

  getAllRatingById() {
    this.blogService.getRating(this._id)
    .pipe(takeUntil(this.destroyed$))
    .subscribe((result: any) => {
      const { rating } = result;
      this.setValueForRating(rating)
    }, error => {
      this.loadError(error);
    })
  }

  setRating(rating: number) {
    this.isRateSet = true;
    this.starRating.forEach(element => {
        element.setRating = false;
    });
    this.setValueForRating(rating);
    this.saveRating(rating);
  }

  setValueForRating(rating: number){
    for(let i = 0; i < rating; i++) {
      this.starRating[i].setRating = true;
    }
  }

  loadError(error: HttpErrorResponse) {
    this.showloader = false;
  }


  ngOnDestroy(): void {
    this.destroyed$.next(false);
    this.destroyed$.unsubscribe();
  }

}
