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
    this.mutationProcess();
  }

  mutationProcess() {
    // let mutationObject = {...this.object} // shawllo copy
     let mutationObject = JSON.parse(JSON.stringify(this.object)) // deep copy

    this.object.firstName = 'Shyam',
    this.object.address.addressLine1 = 'Phokhara'
    this.object.address.person.fatherName = 'RAM'
    console.log(this.object, '1st');
    console.log(mutationObject, '2nd');

  }

}
