import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { AppService } from "./../../app.service";
import { NewService } from "./../../new.service";
import Pusher from "pusher-js";
import { MatDialog } from "@angular/material/dialog";
import { DetailsPopupComponent } from "./details-popup/details-popup.component";
import { Howl, Howler } from "howler";

@Component({
  selector: "app-broadcast",
  templateUrl: "./broadcast.component.html",
  styleUrls: ["./broadcast.component.css"],
})
export class BroadcastComponent implements OnInit {
  @ViewChild("audioOption") audioPlayerRef: ElementRef;
  constructor(
    private service: AppService,
    private api: NewService,
    public dialog: MatDialog
  ) {}
  id;
  resturantName;
  broadcastcount = 0;
  loading = false;
  pusher: any;
  channel: any;
  audio: any;
  restId = "";
  displayData = [];
  ngOnInit() {
    var str = window.location.href;
    var res = str.split("broadcast/");
    this.id = res[1];
    this.loading = true;
    this.service.getrestInfo(this.id).subscribe((data) => {
      this.loading = false;
      this.resturantName = data[0].friendlyName;
      this.restId = data[0].restId;
      this.getAlldata(data[0].restId, data[0].storeDate, "Jets");
      (error) => {
        this.loading = false;
        console.log(error);
      };
    });
    this.pusher = new Pusher("8892259dee5062541bfb", {
      cluster: "us2",
      forceTLS: true,
    });
    this.channel = this.pusher.subscribe(this.id);
    this.channel.bind("broadcastSend", (data) => {
      console.log(data);
      if (data.length == 0) {
        this.refresh();
      } else {
        this.pushData(data);
      }
    });
  }
  pushData(data) {
    var pusherData = data;
    pusherData["timer"] = 20;
    pusherData["border"] = "black-back";
    console.log(pusherData);
    this.push(pusherData);
  }
  push(data) {
    this.displayData.unshift(data);
    this.displayData = this.putAllUndoneAtBottom(this.displayData);
    this.broadcastCount();
    for (var k = 0; k < this.displayData.length; k++) {
      if (this.displayData[k].timer != 0) {
        this.startTimer(this.displayData[k]);
      }
    }
    this.playAudio();
  }
  playAudio() {
    this.audio = new Audio();
    this.audio.src = "../../../../assets/sounds/slow-spring-board.mp3";
    this.audio.load();
    this.audio.play();
  }
  startTimer(data) {
    var refreshIntervalId = setInterval(() => {
      if (data.timer > 0) {
        data.timer--;
      } else if (data.timer == 0) {
        for (var z = 0; z < this.displayData.length; z++) {
          if (this.displayData[z] == data) {
            this.displayData[z].border = "black-border";
          }
        }
        clearInterval(refreshIntervalId);
      } else if (data.timer == -1) {
        clearInterval(refreshIntervalId);
      }
    }, 1000);
  }
  details(data1) {
    var payload = {
      bid: data1.bid,
    };
    this.loading = true;
    this.api.cpgetBroadcastMessage(payload);
    this.api.getcpgetBroadcastMessage().subscribe((data) => {
      var Arg = {
        subject: data1.subject,
        message: data.message,
      };
      this.loading = false;
      const dialogRef = this.dialog.open(DetailsPopupComponent, {
        width: "99%",
        height: "100%",
        maxWidth: "unset",
        data: Arg,
      });
      dialogRef.afterClosed().subscribe((result) => {
        // //console.log('The dialog was closed');
        this.dialog.closeAll();
      });
    });
  }
  getAlldata(restId, date, chainId) {
    var payload = {
      chainId: chainId,
      restId: restId,
      storeDate: date,
    };
    this.api.cpBroadcastRefresh(payload);
    this.api.getcpBroadcastRefresh().subscribe((data) => {
      if (data.length > 0) {
        this.displayData = data;
        this.broadcastCount();
        this.displayData = this.putAllUndoneAtBottom(this.displayData);
      }
    });
  }
  refresh() {
    window.location.reload();
  }
  formatPhone(x) {
    // console.log('format phone')
    const val = x.split("");
    // console.log(val)
    const displayNo = `(${val[2]}${val[3]}${val[4]}) ${val[5]}${val[6]}${val[7]}-${val[8]}${val[9]}${val[10]}${val[11]}`;
    return displayNo;
  }
  done(row) {
    this.loading = true;
    row.bStatus = !row.bStatus;
    if(!row.bStatus){
      this.service.broadcastBadgeCount= this.service.broadcastBadgeCount+1;
    }
    else{
      this.service.broadcastBadgeCount= this.service.broadcastBadgeCount-1;
    }
    var payload = {
      bid: row.bid,
      bstatus: row.bStatus,
      restId: this.restId,
    };
    if(row.border=='black-back' && row.timer>0){
      row.border='black-border'
    }
    this.api.cpBroadcastAck(payload);
    this.api.getcpBroadcastAck().subscribe((data) => {
      this.loading = false;
      if (data.status == 200) {
        this.displayData = this.putAllUndoneAtBottom(this.displayData);
        this.broadcastCount();
      }
    });
  }
  putAllUndoneAtBottom(data) {
    var done = [];
    var undone = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i].bStatus == true) {
        done.push(data[i]);
      } else if (data[i].bStatus == false) {
        undone.push(data[i]);
      }
    }
    var displayData = undone.concat(done);
    return displayData;
  }
  broadcastCount() {
    this.broadcastcount = 0;
    for (var i = 0; i < this.displayData.length; i++) {
      if (this.displayData[i].bStatus == false) {
        this.broadcastcount = this.broadcastcount + 1;
      }
    }
  }
}
