import { ErrorDialogProvider } from './../error-dialog/error-dialog';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { OnHttpResponse } from '../../interfaces/onHttpResponse';
import { LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class RestClientProvider {

    //region CONSTANTS
    private translateStrings = {
        "LOADING": "LOADING"
    }
    //endregion CONSTANTS

    //region VARIABLES
    private response: OnHttpResponse
    private headers: HttpHeaders
    private urlApi: string = "https://python-server-vicjod.c9users.io/"
    private url: string
    private message: string
    private METHODS = {
        "GET": "GET",
        "POST": "POST",
        "PUT": "PUT",
        "DELETE": "DELETE"
    }
    //endregion VARIABLES

    //region CONSTRUCTOR
    constructor(public http: HttpClient,
        public loadingCtrl: LoadingController,
        public dialogError: ErrorDialogProvider,
        private translate: TranslateService) {
        translate
            .get(this.translateStrings.LOADING)
            .subscribe(value => {
                this.message = value
            })
    }
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

    private prepareLoader(){
        let loader = this.loadingCtrl.create({ content: this.message });
        loader.present()
        return loader
    }

    private showErrorHttp() {
        this.dialogError.showErrorDialog(6)
    }
    //endregion PRIVATE_METHODS

    //region PUBLIC_METHODS
    public doRequest(method: string = "GET", target: string, auth: string,
        responseObject: OnHttpResponse, data?: Map<string, any>) {

        this.prepareRequest(target, auth, responseObject)

        let loader = this.prepareLoader()
        
        var djson: string = null
        if (data != null) {
            if (data.size > 0) {
                djson = JSON.stringify(data)
            }
        }

        switch (method) {
            case this.METHODS.POST: //POST
                this.http.post(this.url, djson, { headers: this.headers })
                    .subscribe(
                        data => {
                            this.response.onDataReceived(data)
                        },
                        error => {
                            this.showErrorHttp()
                        })
                break;
            case this.METHODS.PUT: //PUT
                this.http.put(this.url, djson, { headers: this.headers })
                    .subscribe(
                        data => {
                            this.response.onDataReceived(data)
                        },
                        error => {
                            this.showErrorHttp()
                        })
                break;
            case this.METHODS.DELETE: //DELETE
                this.http.delete(this.url, { headers: this.headers })
                    .subscribe(
                        data => {
                            this.response.onDataReceived(data)
                        },
                        error => {
                            this.showErrorHttp()
                        })
                break;
            case this.METHODS.GET: //GET
            default:
                this.http.get(this.url, { headers: this.headers })
                    .subscribe(
                        data => {
                            this.response.onDataReceived(data)
                        },
                        error => {
                            this.showErrorHttp()
                        }
                    )
                break;
        }

        loader.dismiss()
    }
    //endregion PUBLIC_METHODS
}