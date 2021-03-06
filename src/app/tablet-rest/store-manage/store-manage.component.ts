import { Component, OnInit } from "@angular/core";
import { AppService } from "./../../app.service";
import { NewService } from "./../../new.service";
import { MatDialog } from "@angular/material/dialog";
import { StoreManageDialogComponent } from "./store-manage-dialog/store-manage-dialog.component";
import { unescapeHtml } from "@angular/platform-browser/src/browser/transfer_state";

import {FeedbackHistoryComponent} from './../feedback/feedback-history/feedback-history.component'
declare var $: any;
@Component({
  selector: "app-store-manage",
  templateUrl: "./store-manage.component.html",
  styleUrls: ["./store-manage.component.css"],
})
export class StoreManageComponent implements OnInit {
  id;
  resturantName;
  loading = false;
  pinVerified = false;
  storePinlengthMessage = false;
  storePIN = "";
  pinAttempt = 0;
  restId=''
  sid = "";
  storedata;
  textOrderVariable = "";
  deliveryObjPause = {
    db: "cb_minTotalForDelivery",
    item: "Delivery Min ($)",
    response: "1000.00",
    type: "text",
  };
  deliveryObjResume = {
    db: "cb_minTotalForDelivery",
    item: "Delivery Min ($)",
    response: "12.00",
    type: "text",
  };
  constructor(
    private service: AppService,
    private api: NewService,
    public dialog: MatDialog
  ) {}

  feedbackHistory(){
    var payload={
      restName: this.resturantName,
      restId:this.restId
    }
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(FeedbackHistoryComponent, {
      width: "99%",
      height: "100%",
      maxWidth: "unset",
      data:payload
    });
    dialogRef.afterClosed().subscribe((result) => {
      // //console.log('The dialog was closed');
    });
  }
  ngOnInit() {
    var str = window.location.href;
    var res = str.split("manage/");
    this.id = res[1];
    this.loading = true;
    this.service.getrestInfo(this.id).subscribe((data) => {
      this.loading = false;
      this.resturantName = data[0].friendlyName;
      this.restId=data[0].restId;
      this.api.resturantName = this.resturantName;
      let name = this.resturantName;
      let sid = name.split(" ");
      this.sid= sid[0];
      this.sid= this.sid.replace("-","");

      (error) => {
        this.loading = false;
        console.log(error);
      };
    });
  }
  storePinString(data) {
    data = data.toString();
    return data;
  }
  refund() {
    var data = {
      refund: true,
      data: this.storedata,
      id: "+1" + this.id,
    };
    this.openDialog(data);
  }
  extendPin() {
    this.storePinlengthMessage = false;
    this.loading = true;
    if (this.storePIN.toString().length < 4) {
      this.loading = false;
      this.storePinlengthMessage = true;
    } else {
      var pin = this.service.checkPin("+1" + this.id, this.storePIN).subscribe(
        (data) => {
          this.loading = false;
          if (data.pinStatus == true) {
            this.pinAttempt = 0;
            this.pinVerified = true;
            pin.unsubscribe();
            this.loadData();
          } else {
            this.pinAttempt = this.pinAttempt + 1;
            if (this.pinAttempt > 3) {
            }
          }
        },
        (error) => {
          this.loading = false;
          console.log(error);
        }
      );
    }
  }
  loadData() {
    this.loading = true;
    this.api.cpFetchManageDetail(this.sid.toUpperCase());
    this.api.getManageDetails().subscribe((storeResponse) => {
      this.loading = false;
      console.log(storeResponse);
      this.storedata = storeResponse;
    });
  }
  async textOrders() {
    this.loading = true;
    $("#textpopupPaused").modal("hide");
    $("#textpopupResumed").modal("hide");
    this.api.PauseStore("+1" + this.id);
    let pause = this.api.getPause().subscribe((x) => {
      pause.unsubscribe();
      if (this.storedata.actionBtnArr[0].item == "Resume Store") {
        $("#textpopupResumed").modal("show");
      } else {
        $("#textpopupPaused").modal("show");
      }
      this.loadData();
    });
  }
  deliveryOrders() {
    $("#deliverypopupPaused").modal("hide");
    $("#deliverypopupResumed").modal("hide");
    if (this.storedata.actionBtnArr[1].item === "Resume Delivery") {
      $("#deliverypopupResumed").modal("show");
      this.updateKey(this.deliveryObjResume);
    }
    if (this.storedata.actionBtnArr[1].item === "Pause Delivery") {
      $("#deliverypopupPaused").modal("show");
      this.updateKey(this.deliveryObjPause);
    }
  }
  async updateKey(res) {
    const dbKeyArr = res.db.split(".");
    if (res.response == "YES") {
      res.response = true;
    }
    if (res.response == "NO") {
      res.response = false;
    }
    await this.api.cpUpdateManageDetail("+1" + this.id, dbKeyArr, res.response);
    //console.log('inside Updatekey')
    //console.log(res)
    const note = `updated ${res.db}`;
    this.api.addNotes(
      "karthik92.ind@gmail.com",
      this.sid.toUpperCase(),
      note,
      "log"
    );
    // this.cancelEdit();

    var subscription = this.api.updateManageDetails().subscribe((data) => {
      subscription.unsubscribe();
      this.loadData();
    });
  }
  items() {
    this.loading = true;
    this.api.stock("+1" + this.id);
    this.api.getStock().subscribe((x) => {
      //console.log(x);
      var data = {
        items: true,
        data: x.items,
        id: "+1" + this.id,
      };
      this.loading = false;
      this.openDialog(data);
    });
  }
  modifiers() {
    this.loading = true;
    this.api.stock("+1" + this.id);
    this.api.getStock().subscribe((x) => {
      //console.log(x)
      this.loading = false;
      var data = {
        modifiers: true,
        data: x.modifiers,
        id: "+1" + this.id,
      };

      this.openDialog(data);
    });
  }
  storeHours() {
    var data = {
      storehours: true,
      data: this.storedata,
      id: "+1" + this.id,
    };
    this.openDialog(data);
  }
  storeOperation() {
    var data = {
      storeoperation: true,
      data: this.storedata,
      id: "+1" + this.id,
    };
    this.openDialog(data);
  }
  testStore() {
    var data = {
      testStore: true,
      data: this.storedata,
      id: "+1" + this.id,
    };
    this.openDialog(data);
  }
  openDialog(Arg) {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(StoreManageDialogComponent, {
      width: "99%",
      height: "100%",
      maxWidth: "unset",
      data: Arg,
    });
    dialogRef.afterClosed().subscribe((result) => {
      // //console.log('The dialog was closed');
    });
  }
}
