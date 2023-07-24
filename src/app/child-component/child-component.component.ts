import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../common-service.service';

@Component({
  selector: 'app-child-component',
  templateUrl: './child-component.component.html',
  styleUrls: ['./child-component.component.scss']
})
export class ChildComponentComponent implements OnInit {
  name = '';
  jsonData: any;
  title: string = '';
  mutationObject = {
    firstName: 'Kabin',
    lastName: 'Dhital',
    age: '1996-04-23'
  }
  constructor(
    private commonServiceService: CommonServiceService
  ) { }

  //call initial phase
  ngOnInit() {
    this.jsonData = this.commonServiceService.getJsonData();
    this.title = this.commonServiceService.getTitle();
  }

  ngAfterViewInit() {
  }

  ngOnDestroy(): void {
    
  }
 

}
