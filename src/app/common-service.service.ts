import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  // http verb/method
  // get, post, delete, patch, put
  public getName: string = '';
  public arrtype = [];
  constructor() { }

  getTitle() {
    return 'Kabin';
  }

  getJsonData() {
    let jsonData = [
      {firstName: 'jone dhital', lastName:'Deo', phoneNumber:'999999999', DOB: '1996/08/10', show: true},
      {firstName: 'kabin', lastName:'Deo', phoneNumber:'999999999', DOB: '1996/08/10', show: false},
      {firstName: 'jone', lastName:'Deo', phoneNumber:'999999999', DOB: '1996/08/10', show: true},
    ];
    return jsonData;
  }
}
