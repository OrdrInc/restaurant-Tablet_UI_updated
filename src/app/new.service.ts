import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { RequestOptions } from '@angular/http';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class NewService {
 address="https://www.ordradminbk.com/";
 resturantName='';
 private manageDetails = new Subject<any>();
 private postStock = new Subject<any>();
 private updateManage = new Subject<any>();
 private pauseData = new Subject<any>();
  constructor(private http: HttpClient) {

  }
  getManageDetails() {
    return this.manageDetails.asObservable();
  }
  getStock() {
    return this.postStock.asObservable();
  }
  updateManageDetails() {
    return this.updateManage.asObservable();
  }
  getPause() {
    return this.pauseData.asObservable();
  }
  PauseStore(rid) {
    const cpPausePacket = JSON.stringify({ restId: rid, });
    // // console.log(cpPausePacket);
    const localAddress = `${this.address}pauseOrders`;
    this.http.post<any>(localAddress, cpPausePacket, httpOptions)
      .subscribe((data) => {

        this.pauseData.next(data);

      },
        error => {
          this.pauseData.next()
        }
      );
  }
  cpUpdateManageDetail(rid, dbkey, dbVal) {
    const cpUpdateManage = JSON.stringify({ 'restId': rid, 'dbkey': dbkey, 'dbVal': dbVal });
    const localAddress = `${this.address}cpUpdateManage`;
    this.http.post<any>(localAddress, cpUpdateManage, httpOptions)
      .subscribe((data) => {
        this.updateManage.next(data);
      });

  }
  
  addNotes(emailId, storeId, info, noteType) {
    const NotesPacket = JSON.stringify({ emailId: emailId, storeId: storeId, info: info, noteType: noteType });
   // console.log(NotesPacket);
    const localAddress = `${this.address}addNotes`;
    this.http.post<any>(localAddress, NotesPacket, httpOptions)
      .subscribe((data) => {
       // console.log(data);
      });
  }
  stock(restId) {
    const outOfStockPacket = JSON.stringify({ restId: restId })
    const localAddress = `${this.address}outOfStock`;
    this.http.post<any>(localAddress, outOfStockPacket, httpOptions)
      .subscribe((data) => {
        this.postStock.next(data);
      })
  }
  cpFetchManageDetail(code) {
    const cpManageDetail = JSON.stringify({ 'code': code });
    const localAddress = `${this.address}cpFetchManage`;
    this.http.post<any>(localAddress, cpManageDetail, httpOptions)
      .subscribe((data) => {
        this.manageDetails.next(data);
      });
  }
 


}

