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

    constructor(private http: Http, private options: RequestOptions) {
        this.options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) });
    };
    getInitalDetails(restId) {
        console.log("getInital details");
        let Url = "http://18.216.166.30/initialLoad";
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
        let Url = "http://18.216.166.30/getAllOrders";
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
    pauseOrders(restid) {
        console.log("Pause Orders");
        let Url = "http://18.216.166.30/pauseOrders";
        let headerInfo = new Headers({ 'Accept': '*', 'Access-Control-Allow-Origin': '*' });
        let data = {
            "restId": "+1" + restid
        }
        let reqOptions = new RequestOptions({ headers: headerInfo });
        return this.http.post(Url, data, reqOptions)
            .map((res: Response) => res)
            .catch(this.handleError);
    }
    acceptOrders(orderid, eta) {
        console.log("Accept Orders");
        let Url = "http://18.216.166.30/acceptOrders";
        let headerInfo = new Headers({ 'Accept': '*', 'Access-Control-Allow-Origin': '*' });
        let data = {
            "orderId": orderid,
            "eta": eta
        }
        let reqOptions = new RequestOptions({ headers: headerInfo });
        console.log(data)
        return this.http.post(Url, data, reqOptions)
            .map((res: Response) => res)
            .catch(this.handleError);

    }

    refundOrders(orderId, reason, dollarValue, timestamp, refundType) {
        console.log("refund order");
        let Url = "http://18.216.166.30/refundOrders";
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
        let Url = "http://18.216.166.30/checkStorePin";
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
        let Url = "http://18.216.166.30/resetStorePin";
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

        let Url = "http://18.216.166.30/getDailyStoreData";
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

        let Url = "http://18.216.166.30/resetEta";
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