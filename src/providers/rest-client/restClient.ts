import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OnHttpResponse } from '../../interfaces/onHttpResponse';

@Injectable()
export class RestClientProvider {

    //region VARIABLES
    private response: OnHttpResponse
    private headers: HttpHeaders
    private urlApi: string = "https://python-server-vicjod.c9users.io/"
    private url: string
    private METHODS = ["GET", "POST", "PUT", "DELETE"]
    //endregion VARIABLES

    //region CONSTRUCTOR
    constructor(public http: HttpClient) { }
    //endregion CONSTRUCTOR

    //region PRIVATE_METHODS
    private prepareRequest(target: string, auth: string, responseObject: OnHttpResponse) {
        this.url = this.urlApi + target
        this.response = responseObject

        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': auth
        })
    }
    //endregion PRIVATE_METHODS

    //region PUBLIC_METHODS
    public doRequest(method: string = "GET", target: string, auth: string,
                    responseObject: OnHttpResponse, data?: Map<string, any>) {
                        
        this.prepareRequest(target, auth, responseObject)

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
    //endregion PUBLIC_METHODS
}