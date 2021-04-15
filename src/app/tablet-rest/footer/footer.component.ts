import { Component, OnInit, Input,ViewChild} from "@angular/core";
import { Router } from "@angular/router";
import { AppService } from './../../app.service';
import { NewService } from "./../../new.service";
import Pusher from "pusher-js";
@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"],
})
export class FooterComponent implements OnInit {
  @Input() landscape;
  @Input() orderFlow;
  year;
  buttonsFlag = true;
  curPage = "";
  res;
  pusher: any;
  channel: any;
  @ViewChild('boxhight') targetElement: any; 
  constructor(private router: Router,private service: AppService,private api:NewService) {}

  ngOnInit() {
    var str = window.location.pathname;
    this.res = str.split("/");
    this.curPage = this.res[1];
    var date = new Date();
    this.year = date.getFullYear();
    var payload={
      restId :"+1"+this.res[2]
     }
    
    this.api.cpFetchCounters(payload);
    this.api.getcpFetchCounters().subscribe((data) => {
     this.service.broadcastBadgeCount=parseInt(data.bcCounter);
     this.service.curbsideBadgeCount=parseInt(data.csCounter);
     this.service.feedbackBadgeCount=parseInt(data.fbCounter);
     this.service.textPOSBadgeCount=parseInt(data.textCounter);
    })
    this.pusher = new Pusher("8892259dee5062541bfb", {
      cluster: "us2",
      forceTLS: true,
    });
    this.channel = this.pusher.subscribe(this.res[2]);
    this.channel.bind("navbarSend", (data) => {
      console.log(data);
      if (data.length == 0) {
       
      } else {
        this.service.broadcastBadgeCount=parseInt(data.bcCounter);
        this.service.curbsideBadgeCount=parseInt(data.csCounter);
        this.service.feedbackBadgeCount=parseInt(data.fbCounter);
        this.service.textPOSBadgeCount=parseInt(data.textCounter);  
      }
    });
   
  }
  goTo(page) {
    if (page == "feedback") {
     
      this.router.navigate(["/fb/" + this.res[2]]);
    }
    if (page == "broadcast") {
     
      this.router.navigate(["/broadcast/" + this.res[2]]);
    }
    if (page == "curbside") {
     
      this.router.navigate(["/curbside/" + this.res[2]]);
    }
    if (page == "rest") {
      this.router.navigate(["/rest/" + this.res[2]]);
    }
    if (page == "manage") {
      this.router.navigate(["/manage/" + this.res[2]]);
    }
  }
}
