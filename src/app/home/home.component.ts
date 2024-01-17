import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  object = {
    firstName: 'Jon',
    lastName: 'Deo',
    age: new Date('199709-16'),
    address: {
      addressLine1: 'Kathmandu',
      addressLine2: 'Basundhara',
      person: {
        fatherName: 'Darryl',
        motherName: 'Deo'
      }
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
