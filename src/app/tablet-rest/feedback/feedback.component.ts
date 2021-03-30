import { Component, OnInit } from '@angular/core';
import { AppService } from './../../app.service';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  constructor(private service: AppService) { }
  id;
  resturantName;
 
  ngOnInit() {
    var str = window.location.href;
        var res = str.split("fb/");
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
