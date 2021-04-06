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
 private postTestOrdr = new Subject<any>();
 private ipData = new Subject<any>();
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
  getTestorder() {
    return this.postTestOrdr.asObservable();
  }
  getIP() {
    return this.ipData.asObservable();
  }
  
  cpRemoveStoreHours(rid, dbkey) {
    const cpRemoveHours = JSON.stringify({ 'restId': rid, 'dbkey': dbkey });
    const localAddress = `${this.address}removeStoreHours`;
    this.http.post<any>(localAddress, cpRemoveHours, httpOptions)
      .subscribe(data => console.log());
  }
  cpAddStoreHours(rid, dbkey, dbVal) {
    const cpAddHours = JSON.stringify({ 'restId': rid, 'dbkey': dbkey, 'dbVal': dbVal });
    const localAddress = `${this.address}addStoreHours`;
    this.http.post<any>(localAddress, cpAddHours, httpOptions)
      .subscribe(data => console.log());
  }
  checkIPV1(ip) {
    const cpIPPacket = JSON.stringify({ ip: ip });
    const localAddress = `${this.address}checkIPv1`;
    this.http.post<any>(localAddress, cpIPPacket, httpOptions)
      .subscribe((data) => {
        this.ipData.next(data);
      });
  }
  testOrder(rid, testCase, actionItem) {
    const testPacket = JSON.stringify({ restId: rid, custText: testCase, actionItem: actionItem });
   // console.log(testPacket);
    const localAddress = `${this.address}testOrder`;
    this.http.post<any>(localAddress, testPacket, httpOptions)
      .subscribe((data) => {
       // console.log(data);
        this.postTestOrdr.next(data);
      });
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

