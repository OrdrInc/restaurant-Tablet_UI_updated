import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { AppService } from './../../../app.service';
@Component({
  selector: 'app-ticket-id-popup',
  templateUrl: './ticket-id-popup.component.html',
  styleUrls: ['./ticket-id-popup.component.css']
})
export class TicketIdPopupComponent implements OnInit {
  @Input() ticketId: string;
  @Output('save') saves: EventEmitter<any> = new EventEmitter();
  constructor(private service: AppService) { }
  
  ngOnInit() {
   
  }
  saveTicketId(){
   this.saves.emit(this.ticketId); 
  }
}
