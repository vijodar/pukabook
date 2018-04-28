import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OnHttpResponse } from '../../interfaces/onHttpResponse';
import 'rxjs/add/operator/map';

@Injectable()
export class RestClient {

    private response: OnHttpResponse
    private headers: HttpHeaders
    private urlApi: string = "https://randomuser.me/api/?results=100"
    private url: string

    private METHODS = ["GET", "POST", "PUT", "DELETE"]

    constructor(public http: HttpClient) { }

    public prepareRequest(target: string, auth: string, responseObject: OnHttpResponse, ) {
        this.url = this.urlApi + target
        this.response = responseObject

        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': auth
        })
    }

    public doRequest(method: string = "GET", data?: Map<string, any>) {
        var djson: string = null
        if (data != null) {
            if (data.size > 0) {
                djson = JSON.stringify(data)
            }
        }

        switch (method) {
            case this.METHODS[1]: //POST
                this.http.post(this.url, djson, { headers: this.headers })
                    .subscribe(data => {
                        this.response.onDataReceived(data)
                    })
                break;
            case this.METHODS[2]: //PUT
                this.http.put(this.url, djson, { headers: this.headers })
                    .subscribe(data => {
                        this.response.onDataReceived(data)
                    })
                break;
            case this.METHODS[3]: //DELETE
                this.http.delete(this.url, { headers: this.headers })
                    .subscribe(data => {
                        this.response.onDataReceived(data)
                    })
                break;
            case this.METHODS[0]: //GET
            default:
                this.http.get(this.url, { headers: this.headers })
                    .subscribe(data => {
                        this.response.onDataReceived(data)
                    })
                break;
        }
    }
}