import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-order-detail-eta',
  templateUrl: './order-detail-eta.component.html',
  styleUrls: ['./order-detail-eta.component.css']
})
export class OrderDetailEtaComponent implements OnInit {
  @Input() orderDetail: any;
  @Input() tempETA: any;
  @Input() eta: any;
  @Input() landscape: any;

  @Output('setETA') setETAs: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  setETA(time) {
    this.setETAs.emit(time);

  }

}
