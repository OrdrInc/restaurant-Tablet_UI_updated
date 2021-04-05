import { Component, OnInit } from '@angular/core';
import { AppService } from './../../app.service';
import { NewService } from './../../new.service';
import { MatDialog } from '@angular/material/dialog';
import {StoreManageDialogComponent} from './store-manage-dialog/store-manage-dialog.component'
@Component({
  selector: 'app-store-manage',
  templateUrl: './store-manage.component.html',
  styleUrls: ['./store-manage.component.css']
})
export class StoreManageComponent implements OnInit {
  id;
  resturantName;
  loading=false;
  pinVerified=false;
  storePinlengthMessage=false;
  storePIN;
  pinAttempt=0;
  sid="mid26";
  storedata;
  deliveryObjPause = {
    'db' : 'cb_minTotalForDelivery',
    'item': 'Delivery Min ($)',
    'response' : '1000.00',
    'type' : 'text'
  };
  deliveryObjResume = {
    'db' : 'cb_minTotalForDelivery',
    'item': 'Delivery Min ($)',
    'response' : '12.00',
    'type' : 'text'
  };
  constructor(private service: AppService,private api:NewService,public dialog: MatDialog) { }

  ngOnInit() {
    var str = window.location.href;
        var res = str.split("manage/");
        this.id = res[1];
        this.loading=true;
        this.service.getrestInfo(this.id).subscribe(
          data => {
            this.loading=false;
              this.resturantName = data[0].friendlyName;
              this.api.resturantName=this.resturantName
          error => {
            this.loading=false;
              console.log(error);
          }
          });
  }
  extendPin() {
    this.storePinlengthMessage = false;
    this.loading = true;
    if(this.storePIN.toString().length<4){
      this.loading=false;
      this.storePinlengthMessage=true;
    }
    else{
    var pin=this.service.checkPin("+1"+this.id, this.storePIN).subscribe(
        data => {
            this.loading = false;
            if (data.pinStatus == true) {
                this.pinAttempt = 0;
                this.pinVerified=true;
                pin.unsubscribe();
                this.loadData();
        
            }
            else {
                this.pinAttempt = this.pinAttempt + 1;
                if (this.pinAttempt > 3) {

                }
            }
        },
        error => {
            this.loading = false;
            console.log(error);
        });
      }

}
loadData() {
  this.loading=true;
  this.api.cpFetchManageDetail(this.sid.toUpperCase());
     this.api.getManageDetails()
      .subscribe((storeResponse) => {
        this.loading=false;
        console.log(storeResponse);
        this.storedata=storeResponse;
    });
}
async textOrders(){
  this.loading=true;
   this.api.PauseStore("+1"+this.id);
   let pause= this.api.getPause()
  .subscribe((x) => {
    pause.unsubscribe();
    this.loadData();
  })
}
deliveryOrders(){
  if (this.storedata.actionBtnArr[1].item === 'Resume Delivery') {
  this.updateKey(this.deliveryObjResume);
  }
  if (this.storedata.actionBtnArr[1].item === 'Pause Delivery') {
  this.updateKey(this.deliveryObjPause);
  }
}
async updateKey(res) {
  const dbKeyArr  = res.db.split('.');
   if(res.response=='YES'){
     res.response= true;
   }
   if(res.response=='NO'){
     res.response =false
   }
   await this.api.cpUpdateManageDetail("+1"+this.id, dbKeyArr,  res.response);
   //console.log('inside Updatekey')
   //console.log(res)
   const note = `updated ${res.db}`
   this.api.addNotes("karthik92.ind@gmail.com", this.sid.toUpperCase(), note, 'log')
   // this.cancelEdit();

   var subscription= this.api.updateManageDetails()
     .subscribe((data) => {
       subscription.unsubscribe();
       this.loadData();
     });
}
items(){
  this.loading=true;
  this.api.stock("+1"+this.id)
  this.api.getStock()
  .subscribe((x) => {
    //console.log(x);
   var data= {
      items: true,
      data: x.items,
      id:"+1"+this.id
    }
    this.loading=false;
    this.openDialog(data);
})
}
modifiers(){
  this.loading=true;
    this.api.stock("+1"+this.id)
    this.api.getStock()
    .subscribe((x) => {
      //console.log(x)
      this.loading=false;
      var data= {
        modifiers: true,
        data: x.modifiers,
        id:"+1"+this.id
      }
      
      this.openDialog(data);
    })
}
storeHours(){
  var data= {
    storehours: true,
    data:this.storedata,
    id:"+1"+this.id
  }
  this.openDialog(data);
}
storeOperation(){
  var data= {
    storeoperation: true,
    data:this.storedata,
    id:"+1"+this.id
  }
  this.openDialog(data);
}
openDialog(Arg) {
  this.dialog.closeAll();
  const dialogRef = this.dialog.open(StoreManageDialogComponent, {
    width: '99%',
    data: Arg
  });
dialogRef.afterClosed().subscribe(result => {
    // //console.log('The dialog was closed');
    
  });
}
}
