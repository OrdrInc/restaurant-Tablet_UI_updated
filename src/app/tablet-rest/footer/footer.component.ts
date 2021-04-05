import { Component, OnInit, Input,ViewChild} from "@angular/core";
import { Router } from "@angular/router";
import { AppService } from './../../app.service';
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
  @ViewChild('boxhight') targetElement: any; 
  constructor(private router: Router,private service: AppService) {}

  ngOnInit() {
    var str = window.location.pathname;
    this.res = str.split("/");
    this.curPage = this.res[1];
    var date = new Date();
    this.year = date.getFullYear();
    const height = this.targetElement.nativeElement.offsetHeight;
    alert(height);
  }
  goTo(page) {
    if (page == "feedback") {
      this.service.feedbackBadgeCount=0;
      this.router.navigate(["/fb/" + this.res[2]]);
    }
    if (page == "broadcast") {
      this.service.broadcastBadgeCount=0;
      this.router.navigate(["/broadcast/" + this.res[2]]);
    }
    if (page == "curbside") {
      this.service.curbsideBadgeCount=0;
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
