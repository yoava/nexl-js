import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import * as $ from 'jquery';
import {MESSAGE_TYPE, MessageService} from "../services/message.service";
import {HttpRequestService} from "../services/http.requests.service";
import {GlobalComponentsService} from "../services/global-components.service";
import {UtilsService} from "../services/utils.service";

export const CTRL_S = 'control+s';
export const F9 = 'F9';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private authService: AuthService, private messageService: MessageService, private http: HttpRequestService, private globalComponentsService: GlobalComponentsService) {
  }

  discoverKeyCombination(event) {
    if (event.ctrlKey || event.metaKey) {
      switch (String.fromCharCode(event.which).toLowerCase()) {
        case 's':
          return CTRL_S;
      }
    }

    if (event.which === 120) {
      return F9;
    }

    return null;
  }

  interceptHotKeys() {
    $(window).bind('keydown', (event) => {
      const key = this.discoverKeyCombination(event);
      switch (key) {
        case CTRL_S:
          this.messageService.sendMessage(MESSAGE_TYPE.SAVE_NEXL_SOURCE);
          event.preventDefault();
          return;


        case F9 :
          event.preventDefault();
          return;
      }
    });
  }

  ngOnInit() {
    // loading server info
    this.http.post({}, '/general/info', 'json').subscribe(
      (info: any) => {
        UtilsService.setServerInfo(info.body);
        this.authService.refreshStatus();
        this.interceptHotKeys();
      },
      (err) => {
        console.log(err);
        this.globalComponentsService.notification.openError('Failed to load data from server\nReason : ' + err.statusText);
      }
    );

  }
}
