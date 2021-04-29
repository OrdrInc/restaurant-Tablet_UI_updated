import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewService } from '../../../new.service';
import { Component, OnInit, Inject } from '@angular/core';
import { AppService } from './../../../app.service'
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
declare var $: any;
@Component({
  selector: 'app-store-manage-dialog',
  templateUrl: './store-manage-dialog.component.html',
  styleUrls: ['./store-manage-dialog.component.css']
})
export class StoreManageDialogComponent implements OnInit {

  constructor(public api: NewService,public cp:AppService,private router: Router, public dialogRef: MatDialogRef<StoreManageDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  to: string ;
  finalLoading=false;
  msg: string;
  notes: string;
  isNotes = true;
  updatedItems=[];
  dbValItemArr = [];
  dbValModArr = [];
  storeEditData;
  isEdit=false;
  location
  showBtn = -1;
  infoBtn= -1;
  showBtnZone = -1;
  showBtnCol1 = -1;
  showBtnCol3 = -1;
  sid="mid26";
  testData
  isPosBtn = true;
  loadingText='';
  isIpCheck=false;
  isStorePaused=false;
  isDeliveryPaused=false;
  testBtn = [
    {
      'item' : 'Is Text Ordering On',
      'bg' : 'white',
      'color' : 'black'
    },
    {
      'item' : 'Is Delivery On',
      'bg' : '#28a844',
      'color' : 'white'
    },
    {
      'item' : 'Is Store Connection-1 working?',
      'bg' : '#027afe',
      'color' : 'white'
    },
    {
      'item' : 'Is Store Connection-2 working?',
      'bg' : '#13a3b8',
      'color' : 'white'
    },
    ]
    PosOrders = [
      {
        'title' : 'Pickup',
        'textmsg' : '3 pepsi for pickup'
      },
      {
        'title' : 'Delivery',
        'textmsg' : '20 ranch cups and 10 pepsi'
      },
      {
        'title' : 'F/O Pickup',
        'textmsg' : '3 pepsi for pickup at 4:00 PM'
      },
      {
        'title' : 'F/O Delivery',
        'textmsg' : '20 ranch cups and 10 pepsi at 4:00 PM'
      },
      {
        'title' : 'Contactless',
        'textmsg' : '20 ranch cups and 10 pepsi. Pls do contactless and place the pizza on table'
      },
      {
        'title' : 'Custom',
        'textmsg' : '5 pepsi for pickup'
      }
    ];
    displayedColumnstxtOrdr = [
      { name: "#", value: 0, sort: false },
      { name: "POS ID", value: 1, sort: false },
      { name: "Date", value: 2, sort: false },
      { name: "Time", value: 3, sort: false },
      { name: "Method", value: 4, sort: false },
      { name: "Payment Method", value: 5, sort: false },
      { name: "Grand Total", value: 6, sort: false }, 
      { name: "Type", value: 7, sort: false },
      { name: "Order Id", value: 8, sort: false },

    ];
    fromDate;
    toDate;  
    errorTextFlag=false;
    errorText='';
    loading=false;
    displayData=[];
    initateRefund: boolean = true;
    fullRefund: boolean = false;
    partialRefund: boolean = false;
    itemRefund: boolean = false;
    refundComfirmation: boolean = false;
    refundSummary:boolean=false;
    reason: string = "";
    partialRefundAmount: string = "";
    partialRefundReason: string = "";
    customTime: any;
    itemRefundReason: any;
    type: any;
    amount: any;
    reasonrefund: any='Managers decision';
    storePIN: any = "";
    item: any;
    singleItemRefund: boolean = false;
    storePinlengthMessage: boolean = false;
    pinAttempt: number = 0;
    storePinDisplay: boolean = false;
    orderDetail:any;
  ngOnInit() {
    this.errorTextFlag=false;
    this.errorText='';
    if(this.data.isViewNote){
      if(this.data.notes.length >= 1) {
        this.isNotes = false;
      }
    }
    for (const textItem of this.data.data.textArr) {
      if (textItem.item === 'Primary IP') {
        if (textItem.response !== '*') {
          this.testBtn[2].item = textItem.response;
        } else  {
          this.testBtn[2].item = 'Not Valid - IP';
        }
      }
      if (textItem.item === 'Secondary IP') {
        if (textItem.response !== '*') {
          this.testBtn[3].item = textItem.response;
        } else  {
          this.testBtn[3].item = 'Not Valid - IP';
        }
     }
    }
    if(this.data.refund){
      let fromDate = new Date();
      fromDate.setDate(fromDate.getDate());
      this.fromDate= fromDate;
      let endDate = new Date();
      endDate.setDate(endDate.getDate());
      this.toDate= endDate;
    }
  
  }
  amountValidation(){
    var amount = parseFloat(this.partialRefundAmount);
        var fullamount = parseFloat(this.orderDetail.total);
        if (amount > fullamount) {
            return true;
        }
        else {
            return false;
        }
     
  }
  openRefund(order){
    this.orderDetail=order
    this.resetRefundVariables();
    this.initateRefund = true;
    this.fullRefund = false;
    this.partialRefund = false;
    this.itemRefund = false;
    this.refundSummary = false;
    $('#refund').modal('show');
  }
  resetRefundVariables() {
    this.reason = "";
    this.partialRefundAmount = "";
    this.partialRefundReason = "";
    this.customTime = "";
    this.itemRefundReason = "";
    this.type = "";
    this.amount = "";
   
    this.storePIN = "";
    this.item = "";
    this.singleItemRefund = false;
    this.pinAttempt = 0;
    this.storePinlengthMessage = false;
    this.storePinDisplay = false;
}
storePinString(data){
  data=data.toString();
  return data;
 }
refundType(type) {
  if (type == 'FULL') {
     /* this.initateRefund = false;
      this.fullRefund = true;
      this.partialRefund = false;
      this.itemRefund = false;
      this.refundSummary = false;*/
      this.submitRefundRequest('FULL');
  }
  if (type == 'PARTIAL') {
      this.partialRefundAmount = "";
      this.partialRefundReason = "";
      this.initateRefund = false;
      this.fullRefund = false;
      this.partialRefund = true;
      this.itemRefund = false;
      this.refundSummary = false;
  }
 
}
submitRefundRequest(type) {
  this.refundSummary = true;
  this.initateRefund = false;
  this.fullRefund = false;
  this.partialRefund = false;
  this.itemRefund = false;
  if (type == 'FULL') {
      this.singleItemRefund = false;
      this.type = 'Full Refund'
      this.amount = this.orderDetail.total;
      this.amount = this.amount;

  }
  if (type == 'PARTIAL') {
      this.singleItemRefund = false;
      this.type = 'Partial  Refund'
      this.amount = this.partialRefundAmount;  
    }
 
}
finalRefund(){
  var payload={
    orderId:  this.orderDetail.orderId,
    reason : this.reasonrefund, 
    refundValue : this.amount.toString(), 
    refundType: "order"
}
console.log(payload);
this.finalLoading=true;
var pin=this.cp.checkPin(this.data.id, this.storePIN).subscribe(
  data => {
    this.finalLoading=false;
  
      if (data.pinStatus == true) {
          this.pinAttempt = 0;
          pin.unsubscribe();
          this.finalLoading=true;
          this.api.cpRefund(payload);
          this.api.getcpRefund()
          .subscribe((x) => {
          this.finalLoading=false;
          if(x.message=='Refund Updated Successfully'){
            $("#refundSuccess").modal("show");
            $("#refund").modal("hide");
          }
          else{
            $("#refundFailed").modal("show");
            $("#refund").modal("hide");
          }
          })
        }
      else {
          this.pinAttempt = this.pinAttempt + 1;
          if (this.pinAttempt > 3) {

          }
      }
  },
  error => {
      this.loading = false;
      $("#refundFailed").modal("show");
      $("#refund").modal("hide");
      console.log(error);
  });
}

refundClick() {


  this.resetRefundVariables();
  this.initateRefund = true;
  this.fullRefund = false;
  this.partialRefund = false;
  this.itemRefund = false;
  this.refundSummary = false;
}
  search(){
    this.errorTextFlag=false;
    this.errorText='';
    if(this.fromDate== null || this.fromDate==''){
      this.errorTextFlag=true;
      this.loading = false;;
      this.errorText="Please select a From Date." 
    }
    else if(this.toDate== null || this.toDate==''){
      this.errorTextFlag=true;
      this.loading = false;;
      this.errorText="Please select To Date." 
    }
   else if(this.fromDate> new Date()){
      this.errorTextFlag=true;
      this.loading = false;;
      this.errorText="From Date Can't be greater than Today's Date."
    }
    else if(this.toDate> new Date()){
      this.errorTextFlag=true;
      this.loading = false;
      this.errorText="To Date Can't be greater than Today's Date."
    }
    else if(this.fromDate> this.toDate){
      this.errorTextFlag=true;
      this.loading = false;
      this.errorText="From Date Can't be greater than To Date."
    }
    else{
      var from = `${this.fromDate.getFullYear()}-${this.dateFormatter((this.fromDate.getMonth() + 1))}-${this.dateFormatter(this.fromDate.getDate())}`;
      var to= `${this.toDate.getFullYear()}-${this.dateFormatter((this.toDate.getMonth() + 1))}-${this.dateFormatter(this.toDate.getDate())}`;
      var data={
        searchBy:"txtorder",
        fromDate:from,
        toDate:to,
        restNum:this.data.id
      }
      this.loading = true;
      this.api.cpcontrolData(data);
      this.api.getcpcontrolData().subscribe((data) => {
        //console.log(data);
        this.loading = false;
        if (data.statusCode == 200) {
          this.displayData = data.data;
          if (this.displayData.length == 0) {
            this.errorTextFlag = true;
            this.errorText = "No Data Found.";
          }
        }
      });
    }
  
  }
  onEdit_col3(i) {
    this.isEdit = true;
    this.showBtnCol3 = i;
  }
  dateFormatter(val) {
    val = val.toString()
    if (val.length != 1) {
      return val
    } else {
      return `0${val}`
    }
  }
  onEdit_col1(i) {
    this.isEdit = true;
    this.showBtnCol1 = i;
  }
  onEdit(i) {
    this.location = i;
    this.isEdit = true;
    this.showBtn = i;
  }
  info(i){
    this.infoBtn=i;
  }
  close() {
    this.dialogRef.close();
  }

  
 cancelEdit(){
  this.isEdit = false;
  this.showBtn = -1;
  this.showBtnCol1 = -1;
  this.showBtnCol3 = -1;
  this.showBtnZone =- 1;
  this.api.cpFetchManageDetail(this.sid.toUpperCase());
  this.api.getManageDetails()
   .subscribe((storeResponse) => {
     console.log(storeResponse);
     this.data.data=storeResponse;
 });
 }
  onItemsChange() {
    for (const cat of this.data.data) {
      for (const item of cat.itemsList) {
        if (!item.avalibility){
          this.dbValItemArr.push(item.dbName)
        }
      }
    }
    this.api.cpUpdateManageDetail(this.data.id, ['itemsOOStock'], this.dbValItemArr)
    this.dialogRef.close();
  }
  updateModifiers(item) {
    // //console.log(item)
  }
  async updateKey(res) {
    const dbKeyArr  = res.db.split('.');
     if(res.response=='YES'){
       res.response= true;
     }
     if(res.response=='NO'){
       res.response =false
     }
     await this.api.cpUpdateManageDetail(this.data.id, dbKeyArr,  res.response);
     //console.log('inside Updatekey')
     //console.log(res)
     const note = `updated ${res.db}`
     this.api.addNotes("karthik92.ind@gmail.com", this.sid.toUpperCase(), note, 'log')
     // this.cancelEdit();
  
     var subscription= this.api.updateManageDetails()
       .subscribe((data) => {
         subscription.unsubscribe();
         this.cancelEdit();
       });
  }
  editItem(radio) {
    if (radio.db.includes('storeHours_json')) {
      if (radio.item === 'Zone') {
        this.updateKey(radio);
      } else {
          if (radio.open_0 === '*') {
            let dbKeyArr1  = radio.db.split('.');
            dbKeyArr1 = this.storeHoursUpdate('open', '*', radio.open, dbKeyArr1);
            dbKeyArr1 = this.storeHoursUpdate('close', 'open', radio.close, dbKeyArr1);
            this.api.updateManageDetails()
              .subscribe((data) => {
               // //console.log('update completed')
               // this.storeHourSubscription = this.cp.cpStoreTxtHour(this.cp.sendRestId)
                this.cancelEdit();
              });
          } else {
            let dbKeyArr1  = radio.db.split('.');
            dbKeyArr1 = this.storeHoursUpdate('open', '*', radio.open, dbKeyArr1);
            dbKeyArr1 = this.storeHoursUpdate('close', 'open', radio.close, dbKeyArr1);
            dbKeyArr1 = this.storeHoursUpdate('open_0', 'close', radio.open_0, dbKeyArr1);
            dbKeyArr1 = this.storeHoursUpdate('close_0', 'open_0', radio.close_0, dbKeyArr1);
            this.api.updateManageDetails()
              .subscribe((data) => {
               //  //console.log('update completed')
               //  this.storeHourSubscription = this.cp.cpStoreTxtHour(this.cp.sendRestId)
                this.cancelEdit();
              });
          }
    
          const note = `updated ${radio.db}`
         
          this.api.addNotes("", this.sid, note, 'log') 
    
        
  
      }
    } else if (radio.db.includes('cb_atStoreLim')){
      this.updateKey(radio)
      this.api.cpUpdateManageDetail(this.data.id, ['cb_cashEligibleLim'], radio.response)
  
    } 
    else {
      this.updateKey(radio);
    }
  }
  onEditZone(i) {
    this.isEdit = true;
    this.showBtnZone = i
  }
  trackByFn(index: any, item: any) {
    return index;
 }
  onModChange() {
    for (const cat of this.data.data) {
      for (const item of cat.items) {
        if (!item.avalibility){
          this.dbValModArr.push(item.dbName)
        }
      }
    }
    this.api.cpUpdateManageDetail(this.data.id, ['modsOOStock'], this.dbValModArr)
    this.dialogRef.close();
  } 
  storeHoursUpdate(pushKey, popKey, hoursInfo, dbArr) {
    if (popKey !== '*') {
      dbArr.pop(popKey);
    }
    dbArr.push(pushKey);
    this.api.cpUpdateManageDetail(this.data.id, dbArr,  hoursInfo);
  
    return dbArr;
  }

  onTestCase(item) {
    this.isPosBtn=true;
    this.loadingText= item;
    this.isIpCheck=false;
    this.isStorePaused=false;
    this.isDeliveryPaused=false;
    this.testData=[];
    if (item  === 'Store Paused') {
      
      const testCase = '5 pespi for pickup';
      this.api.testOrder(this.data.id, testCase, 'Store Paused');
      this.api.getTestorder()
      .subscribe((x) => {
        this.loadingText= '';
        this.isStorePaused=true;
        if (x.summaryJson.customer.msg.type !== 'order') {
          this.testData = {'res' : x.summaryJson.orderSummary, 'item' : item};
         
        } else {
          // tslint:disable-next-line:max-line-length
          this.testData = {'res' : 'Currently store is taking orders. If this is not the expected behaviour for this store. Please reachout to system administrator.', 'item' : item};
       
        }
      });
    }
    if (item  === 'Delivery Paused') {
     
      const testCase = `20 ranch cups delivery at`;
      this.api.testOrder(this.data.id, testCase, 'Delivery Paused');
      this.api.getTestorder()
      .subscribe((x) => {
        this.loadingText= '';
        this.isDeliveryPaused=true;
        if (x.summaryJson.customer.msg.type !== 'order') {
          this.testData = {'res' : x.summaryJson.orderSummary, 'item' : item};
  
        } else {
         
          this.testData = {'res' : 'Currently store is taking delivery orders. If this is not the expected behaviour for this store. Please reachout to the system administrator.', 'item' : item};
         
        }
      });
    }
    if (item.includes('.')) {
      
      this.api.checkIPV1(item);
      this.api.getIP()
      .subscribe((x) => {
        this.isIpCheck=true;
        this.loadingText= '';
        this.testData = {'res' : x, 'ip' : item};
     
      });
      }
  
   
  }
  add(item,index) {
    //console.log(item);
    this.data.data.storeHours[index].open_0 = '00:00:00';
    this.data.data.storeHours[index].close_0 = '00:00:00';
    this.onEdit_col1(index);
    this.api.cpAddStoreHours(this.data.id, item.db.split('.'), '*');
  
  }
  
  remove(item, index) {
    //console.log(item);
    //console.log(item);
    this.data.data.storeHours[index].open_0 = '*';
    this.data.data.storeHours[index].close_0 = '*';
    this.onEdit_col1(index);
    this.api.cpRemoveStoreHours(this.data.id, item.db.split('.')[1]);
  }
  cancelEdit1(day, i){
    this.remove(day, i);
    this.cancelEdit();
  }
}
