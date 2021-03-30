import { Component, OnInit } from '@angular/core';
import { AppService } from './../../app.service';
@Component({
  selector: 'app-store-manage',
  templateUrl: './store-manage.component.html',
  styleUrls: ['./store-manage.component.css']
})
export class StoreManageComponent implements OnInit {
  id;
  resturantName;
  constructor(private service: AppService) { }

  ngOnInit() {
    var str = window.location.href;
        var res = str.split("manage/");
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
