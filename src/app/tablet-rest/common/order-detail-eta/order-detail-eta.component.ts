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
  customnFlag: boolean;
  customTime: any;
  @Output('setETA') setETAs: EventEmitter<any> = new EventEmitter();
  @Output('confirm') confirms: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  setETA(time) {
    this.tempETA = time;
    this.customnFlag = false;
    this.setETAs.emit(time);

  }
  setcustomETA() {
    this.tempETA = "0"
    this.customnFlag = true;
  }
  confirm(time) {
    this.confirms.emit(time);
    //this.
  }

}
