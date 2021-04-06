import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewService } from '../../../new.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-store-manage-dialog',
  templateUrl: './store-manage-dialog.component.html',
  styleUrls: ['./store-manage-dialog.component.css']
})
export class StoreManageDialogComponent implements OnInit {

  constructor(public api: NewService,private router: Router, public dialogRef: MatDialogRef<StoreManageDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  to: string ;
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
      'item' : 'Store Paused',
      'bg' : 'white',
      'color' : 'black'
    },
    {
      'item' : 'Delivery Paused',
      'bg' : '#28a844',
      'color' : 'white'
    },
    {
      'item' : '192.168.56.12',
      'bg' : '#027afe',
      'color' : 'white'
    },
    {
      'item' : '30.40.60.89',
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
    
      
  ngOnInit() {
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
  
  }
  onEdit_col3(i) {
    this.isEdit = true;
    this.showBtnCol3 = i;
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
