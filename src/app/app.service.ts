import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppService {


    public updateProfileOptions: Array<any> = [];
    public updateEnterpriseStatus: boolean = false;
    server1 = "http://18.216.166.30";
    server2 = "";
    server3 = "";
    prodserver = "https://www.tutalec.com";
    serverused: any;
    ticketid:any

    constructor(private http: Http, private options: RequestOptions) {
        this.options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) });
        this.serverused = this.prodserver;
    };
    getInitalDetails(restId) {
        console.log("getInital details");
        let Url = this.serverused + "/initialLoad";
        let headerInfo = new Headers({ 'Accept': '*', 'Access-Control-Allow-Origin': '*' });
        let data = {
            "restId": "+1" + restId
        }
        let reqOptions = new RequestOptions({ headers: headerInfo });
        return this.http.post(Url, data, reqOptions)
            .map((res: Response) => res.json())
            .catch(this.handleError);

    }
    getAllOrders(restid, date) {
        console.log("Get all Orders");
        let Url = this.serverused + "/getAllOrders";
        let headerInfo = new Headers({ 'Accept': '*', 'Access-Control-Allow-Origin': '*' });
        let data = {
            "restId": "+1" + restid,
            "orderDate": date//"2019-05-10"//date
        }
        let reqOptions = new RequestOptions({ headers: headerInfo });
        return this.http.post(Url, data, reqOptions)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    getrestInfo(restid) {
        let Url = this.serverused + "/getStoreInfo";
        let headerInfo = new Headers({ 'Accept': '*', 'Access-Control-Allow-Origin': '*' });
        let data = {
            "restId": "+1" + restid,
        }
        let reqOptions = new RequestOptions({ headers: headerInfo });
        return this.http.post(Url, data, reqOptions)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    getOneDayRecord(storeId,storeDate) {
        let Url = this.serverused + "/getOneDayRecord";
        let headerInfo = new Headers({ 'Accept': '*', 'Access-Control-Allow-Origin': '*' });
        let data = {
            "restId": storeId,
            "storeDate": storeDate
        }
        let reqOptions = new RequestOptions({ headers: headerInfo });
        return this.http.post(Url, data, reqOptions)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    tabletDoneUndoneTogle(curbId,status) {
        let Url = this.serverused + "/delToCarAction";
        let headerInfo = new Headers({ 'Accept': '*', 'Access-Control-Allow-Origin': '*' });
        let data = {
            "curbId": curbId,
            "status": status
        }
        let reqOptions = new RequestOptions({ headers: headerInfo });
        return this.http.post(Url, data, reqOptions)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    updateTicketId(curbId,ticketId) {
        let Url = this.serverused + "/updateTicketId";
        let headerInfo = new Headers({ 'Accept': '*', 'Access-Control-Allow-Origin': '*' });
        let data = {
            "curbId": curbId,
            "ticketId": ticketId
        }
        let reqOptions = new RequestOptions({ headers: headerInfo });
        return this.http.post(Url, data, reqOptions)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    pauseOrders(restid) {
        console.log("Pause Orders");
        let Url = this.serverused + "/pauseOrders";
        let headerInfo = new Headers({ 'Accept': '*', 'Access-Control-Allow-Origin': '*' });
        let data = {
            "restId": "+1" + restid
        }
        let reqOptions = new RequestOptions({ headers: headerInfo });
        return this.http.post(Url, data, reqOptions)
            .map((res: Response) => res)
            .catch(this.handleError);
    }
    acceptOrders(orderid, eta, customFlag) {
        console.log("Accept Orders");

        let Url = this.serverused + "/acceptOrders";
        let headerInfo = new Headers({ 'Accept': '*', 'Access-Control-Allow-Origin': '*' });
        let data = {
            "orderId": orderid,
            "eta": eta,
            "customFlag": customFlag
        }
        let reqOptions = new RequestOptions({ headers: headerInfo });
        console.log(data)
        return this.http.post(Url, data, reqOptions)
            .map((res: Response) => res)
            .catch(this.handleError);

    }

    refundOrders(orderId, reason, dollarValue, timestamp, refundType) {
        console.log("refund order");
        let Url = this.serverused + "/refundOrders";
        let headerInfo = new Headers({ 'Accept': '*', 'Access-Control-Allow-Origin': '*' });
        let data = {
            'orderId': orderId,
            'reason': reason,
            'dollarValue': dollarValue,
            'timestamp': timestamp,
            'refundType': refundType
        }
        let reqOptions = new RequestOptions({ headers: headerInfo });
        return this.http.post(Url, data, reqOptions)
            .map((res: Response) => res)
            .catch(this.handleError);

    }
    checkPin(restId, storePin) {
        console.log("CheckPin");
        storePin = storePin.toString();
        let Url = this.serverused + "/checkStorePin";
        let headerInfo = new Headers({ 'Accept': '*', 'Access-Control-Allow-Origin': '*' });
        let data =
        {
            "restId": restId,
            "storePin": storePin
        }

        let reqOptions = new RequestOptions({ headers: headerInfo });
        return this.http.post(Url, data, reqOptions)
            .map((res: Response) => res.json())
            .catch(this.handleError);

    }
    resetPin(restId) {
        console.log("ResetPin");
        let Url = this.serverused + "/resetStorePin";
        let headerInfo = new Headers({ 'Accept': '*', 'Access-Control-Allow-Origin': '*' });
        let data =
        {
            "restId": restId,
        }
        let reqOptions = new RequestOptions({ headers: headerInfo });
        return this.http.post(Url, data, reqOptions)
            .map((res: Response) => res)
            .catch(this.handleError);

    }

    storeReport(restId, storeDate) {
        console.log("storeReport");

        let Url = this.serverused + "/getDailyStoreData";
        let headerInfo = new Headers({ 'Accept': '*', 'Access-Control-Allow-Origin': '*' });
        let data =
        {
            "restId": restId,
            "orderDate": storeDate
        }

        let reqOptions = new RequestOptions({ headers: headerInfo });
        return this.http.post(Url, data, reqOptions)
            .map((res: Response) => res.json())
            .catch(this.handleError);

    }

    resetETA(restId, extendFlag, pickupETA, deliveryETA) {
        console.log("storeReport");

        let Url = this.serverused + "/resetEta";
        let headerInfo = new Headers({ 'Accept': '*', 'Access-Control-Allow-Origin': '*' });
        let data =
        {
            "restId": restId,
            "extendEta": extendFlag,
            "pickupSetEta": pickupETA,
            "deliverySetEta": deliveryETA
        }

        let reqOptions = new RequestOptions({ headers: headerInfo });
        return this.http.post(Url, data, reqOptions)
            .map((res: Response) => res)
            .catch(this.handleError);

    }




    getStaticData() {
        return this.http.get('/assets/data.json').map((res: Response) => res.json())
            .catch(this.handleError);
    }
    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Response status: ' + res.status);
        }
        let body = res.json();
        console.log(body);
        return body;
    }
    //
    private handleError(error: any) {
        let errMsg = error.message || 'Server error';
        console.log(errMsg);
        return Observable.throw(errMsg);
    }



}