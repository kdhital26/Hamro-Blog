import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() btnLable: string = 'Button Name, Please';
  @Output() eventEmit = new EventEmitter<any>();
  @Input() addClass: string | undefined;
  @Input() style: any = {};

  constructor() { }

  ngOnInit(): void {
  }

  emitValue(value: any) {
    this.eventEmit.emit(value);
  }

}
