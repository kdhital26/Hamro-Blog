import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonServiceService } from './common-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy  {
  title = '';
  jsonData: any;


  
  constructor(
    private commonService: CommonServiceService //inject
  ) {
  }

//call initial phase
  ngOnInit() {
    this.jsonData = this.commonService.getJsonData();
    this.title = this.commonService.getTitle();
  }

  ngAfterViewInit() {
  }
  visibility: boolean = false;
  setMouseEnter() {
    console.log('test');
    this.visibility = true;
  }

  setMouseLeave(event: any) {
    this.visibility = false;
  }

  ngOnDestroy(): void {
    
  }

  


}
