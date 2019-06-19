import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {
  @Input() orderCount;
  @Output('click') clicked: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  click() {
    this.clicked.emit();
  }

}
