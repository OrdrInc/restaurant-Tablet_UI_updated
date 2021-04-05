import { Component, OnInit } from '@angular/core';
import { AppService } from './../../app.service';
import { NewService } from './../../new.service';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  constructor(private service: AppService,private api:NewService) { }
  id;
  resturantName;
  feedbackcount=0;
  loading=false;
  displayData=[
    {
      name:"Prithvi",
      date:"1/25/2020",
      time:"3:20 PM",
      phoneno:"+19620864669",
      feedback:"It was awesome service thanks to mike for quick help.It was awesome service thanks to mike for quick help.",
      ratingvalue:3,
      verified:false,
      feedbackid:"1"
    },
    {
      name:"Prithvi",
      date:"1/25/2020",
      time:"3:20 PM",
      phoneno:"+19620864669",
      feedback:"It was awesome service thanks to mike for quick help.It was awesome service thanks to mike for quick help.",
      ratingvalue:3,
      verified:true,
      feedbackid:"2"
    },
    {
      name:"Prithvi",
      date:"1/25/2020",
      time:"3:20 PM",
      phoneno:"+19620864669",
      feedback:"It was awesome service thanks to mike for quick help.It was awesome service thanks to mike for quick help.",
      ratingvalue:3,
      verified:false,
      feedbackid:"3"
    }
  ]
  ngOnInit() {
    var str = window.location.href;
        var res = str.split("fb/");
        this.id = res[1];
        this.loading=true;
        this.service.getrestInfo(this.id).subscribe(
          data => {
              this.loading=false;
              this.resturantName = data[0].friendlyName;
          error => {
              this.loading=false;
              console.log(error);
          }
          });
          this.feedbackCount();
          this.displayData= this.putAllUndoneAtBottom(this.displayData);
         
  }
  formatPhone(x) {
    // console.log('format phone')
    const val = x.split('');
    // console.log(val)
    const displayNo = `(${val[2]}${val[3]}${val[4]}) ${val[5]}${val[6]}${val[7]}-${val[8]}${val[9]}${val[10]}${val[11]}`;
    return displayNo;
  }
  done(row){
   row.verified=!row.verified;
   this.displayData= this.putAllUndoneAtBottom(this.displayData);
   this.feedbackCount();
  }
  putAllUndoneAtBottom(data){
    var done=[];
    var undone=[];
    for(var i=0;i<data.length;i++){
      if(data[i].verified==true){
       done.push(data[i]);
      }
      else if(data[i].verified==false){ 
       undone.push(data[i]);
      }
    }
    var displayData=undone.concat(done);
    return displayData;
  }
  feedbackCount(){
    this.feedbackcount=0;
    for(var i=0;i<this.displayData.length;i++){
      if(this.displayData[i].verified==false){
        this.feedbackcount=this.feedbackcount+1;
      }
     }
  }

}
