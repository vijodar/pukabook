import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Content, Platform, LoadingController, Loading } from 'ionic-angular';
import { OnHttpResponse } from '../../interfaces/onHttpResponse';
import { RestClientProvider } from '../../providers/rest-client/restClient';
import { UserDBProvider } from '../../providers/userdb/userdb';
import { StatusBar } from '@ionic-native/status-bar';
import { StartPage } from '../start/start';
import { TranslateService } from '@ngx-translate/core';
import { OnCloseEreaderResponse } from '../../interfaces/onCloseEreaderResponse';

@IonicPage()
@Component({
  selector: 'page-ereader',
  templateUrl: 'ereader.html',
})
export class EreaderPage implements OnHttpResponse, OnCloseEreaderResponse {

  //region VIEWCHILD
  @ViewChild(Content) content: Content

  @ViewChild('scrollToMe') scrollToMe: any
  //endregion VIEWCHILD

  //region CONSTANTS
  private translateStrings = {
    "LOADING": "LOADING"
  }
  //endregion CONSTANTS

  //region PRIVATE_VARIABLES
  private lang: string
  private loadingMsg: string

  private width: any
  private height: any

  private scrollOne: boolean

  private loading: Loading
  //endregion PRIVATE_VARIABLES

  //region PUBLIC_VARIABLES
  public idbook: number

  public title: string

  public bookContent = []
  public alines: number
  public eReaderLines: number
  //endregion PUBLIC_VARIABLES

  //region ONHTTPRESPONSE
  onDataReceived(data: any) {
    var result = data.result
    if (result.auth) {
      this.userdb.modifyUserToken(result.t)
      this.alines = result.alines
      this.bookContent = result.content

      console.log();


      this.loading.present()
    } else {
      this.userdb.getUser()
        .then(value => {
          var basic = btoa(value.email + ":" + value.pass)
          this.rjs.doRequest("POST", "read/" + this.idbook,
            "Basic " + basic, this)
        })
    }
  }
  onErrorReceivingData(message: number) {

  }
  //endregion ONHTTPRESPONSE

  //region ONCLOSEREADERRESPONSE
  onClickCloseReader() {
    this.appCtrl.getRootNavs()[0].setRoot(StartPage)
  }
  //endregion ONCLOSEREADERRESPONSE

  //region NG_AFTER_VIEW_INIT
  ngAfterViewInit() {
    this.content.ionScroll.subscribe(($event) => {
      let any = document.elementFromPoint((this.width), (this.height));

      if (any.id) {
        this.eReaderLines = parseInt(any.id)
        console.log(this.eReaderLines);
      }
    })
  }
  //endregion NG_AFTER_VIEW_INIT

  //region CONTRUCTOR
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private rjs: RestClientProvider,
    private userdb: UserDBProvider,
    private statusBar: StatusBar,
    private appCtrl: App,
    private translate: TranslateService,
    private platform: Platform,
    private loadingCtrl: LoadingController) {

    this.starter()
  }
  //endregion CONTRUCTOR

  //region PRIVATE_METHODS
  private starter() {
    this.statusBar.backgroundColorByHexString("#000")

    this.scrollOne = false
    this.idbook = this.navParams.get('idbook')
    console.log(this.idbook);

    this.title = this.navParams.get('bname')
    this.lang = this.translate.getBrowserLang()
    this.alines = 0

    this.translate.get(this.translateStrings.LOADING)
      .subscribe(value => { this.loadingMsg = value })

    this.userdb.getUser()
      .then(value => {
        this.rjs.doRequest("POST", "read/" + this.idbook + "/" + this.lang,
          "Bearer " + value.token, this)
      })

    this.platform.ready().then((readySource) => {
      this.width = (this.platform.width() / 2)
      this.height = (this.platform.height() / 2)
    });

    this.loading = this.loadingCtrl.create({
      content: this.loadingMsg
    })
  }

  private scrollToAline() {
    var height = this.scrollToMe.nativeElement.offsetTop
    this.content.scrollTo(0, height - 80)
    this.loading.dismiss()
  }
  //endregion PRIVATE_METHODS

  //region PUBLIC_METHODS
  public finishToLoadContent(index: number) {
    var size = this.bookContent.length - 1
    if ((size == index) && !this.scrollOne && this.alines > 0) {
      this.scrollOne = true
      setTimeout(() => {
        this.scrollToAline()
      }, 1000);
    } else if ((size == index) && !this.scrollOne && this.alines == 0) {
      this.loading.dismiss()
    }
  }
  //endregion PUBLIC_METHODS
}
