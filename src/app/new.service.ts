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
 address1="https://www.tutalec.com/";
 resturantName='';
 private manageDetails = new Subject<any>();
 private postStock = new Subject<any>();
 private updateManage = new Subject<any>();
 private pauseData = new Subject<any>();
 private postTestOrdr = new Subject<any>();
 private ipData = new Subject<any>();
 private controlData= new Subject<any>();
 private broadcastMessageData= new Subject<any>();
 private broadcastAckData= new Subject<any>();
 private broadcastRefreshData= new Subject<any>();
 private feedbackAckData= new Subject<any>();
 private feedbackRefreshData= new Subject<any>();
 private fetchCountersData= new Subject<any>();
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
  getcpcontrolData() {
    return this.controlData.asObservable();
  }
  getcpgetBroadcastMessage() {
    return this.broadcastMessageData.asObservable();
  }
  getcpBroadcastAck() {
    return this.broadcastAckData.asObservable();
  }
  getcpBroadcastRefresh() {
    return this.broadcastRefreshData.asObservable();
  }
  getcpFeedbackAck() {
    return this.feedbackAckData.asObservable();
  }
  getcpFeedbackRefresh() {
    return this.feedbackRefreshData.asObservable();
  }
  getcpFetchCounters() {
    return this.fetchCountersData.asObservable();
  }
  cpFetchCounters(data) {
    var fetchCounters= JSON.stringify(data);
      const localAddress = `${this.address1}fetchCounters`;
      this.http.post<any>(localAddress, fetchCounters, httpOptions)
        .subscribe((data) => {
          this.fetchCountersData.next(data);
        });
   }
  cpFeedbackRefresh(data) {
    var feedbackRefresh= JSON.stringify(data);
      const localAddress = `${this.address1}getFbDayRecord`;
      this.http.post<any>(localAddress, feedbackRefresh, httpOptions)
        .subscribe((data) => {
          this.feedbackRefreshData.next(data);
        });
   }
  cpFeedbackAck(data) {
    var feedbackAck = JSON.stringify(data);
      const localAddress = `${this.address1}updateFbAction`;
      this.http.post<any>(localAddress, feedbackAck, httpOptions)
        .subscribe((data) => {
          this.feedbackAckData.next(data);
        });
   }
  cpBroadcastRefresh(data) {
    var broadcastRefresh= JSON.stringify(data);
      const localAddress = `${this.address1}bcFetchOneDay`;
      this.http.post<any>(localAddress, broadcastRefresh, httpOptions)
        .subscribe((data) => {
          this.broadcastRefreshData.next(data);
        });
   }
  cpBroadcastAck(data) {
    var broadcastAck = JSON.stringify(data);
      const localAddress = `${this.address1}acknMessage`;
      this.http.post<any>(localAddress, broadcastAck, httpOptions)
        .subscribe((data) => {
          this.broadcastAckData.next(data);
        });
   }
  cpgetBroadcastMessage(data) {
    var broadcastMessage = JSON.stringify(data);
      const localAddress = `${this.address1}getMessage`;
      this.http.post<any>(localAddress, broadcastMessage, httpOptions)
        .subscribe((data) => {
          this.broadcastMessageData.next(data);
        });
   }
  cpcontrolData(data) {
  var refundInitate = JSON.stringify(data);
    const localAddress = `${this.address}searchOrders`;
    this.http.post<any>(localAddress, refundInitate, httpOptions)
      .subscribe((data) => {
        this.controlData.next(data);
      });
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

