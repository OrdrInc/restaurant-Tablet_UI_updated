import { Component, OnInit } from '@angular/core';
import { AppService } from './../../app.service';
@Component({
  selector: 'app-broadcast',
  templateUrl: './broadcast.component.html',
  styleUrls: ['./broadcast.component.css']
})
export class BroadcastComponent implements OnInit {
  id;
  resturantName;
  constructor(private service: AppService) { }

  ngOnInit() {
    var str = window.location.href;
        var res = str.split("broadcast/");
        this.id = res[1];
        this.service.getrestInfo(this.id).subscribe(
          data => {
              this.resturantName = data[0].friendlyName;
          error => {
            
              console.log(error);
          }
          });
  }

}
