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
  showBtnZone = -1;
  showBtnCol1 = -1;
  showBtnCol3 = -1;
  sid="mid26"
  ngOnInit() {
    if(this.data.isViewNote){
      if(this.data.notes.length >= 1) {
        this.isNotes = false;
      }
    }
  
  }
  onEdit(i) {
    this.location = i;
    this.isEdit = true;
    this.showBtn = i;
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
}
