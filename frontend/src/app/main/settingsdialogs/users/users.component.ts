import {Component, ViewChild} from '@angular/core';
import {jqxWindowComponent} from "jqwidgets-scripts/jqwidgets-ts/angular_jqxwindow";
import {jqxButtonComponent} from "jqwidgets-scripts/jqwidgets-ts/angular_jqxbuttons";
import {GlobalComponentsService} from "../../services/global-components.service";
import {HttpRequestService} from "../../services/http.requests.service";
import {MESSAGE_TYPE, MessageService} from "../../services/message.service";
import {jqxGridComponent} from "jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid";
import {ICONS} from "../../misc/messagebox/messagebox.component";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  @ViewChild('usersWindow') usersWindow: jqxWindowComponent;
  @ViewChild('closeButton') closeButton: jqxButtonComponent;
  @ViewChild('usersGrid') usersGrid: jqxGridComponent;

  isAdmin = false;
  counter = 0;

  usersSource =
    {
      localdata: [],
      datafields: [
        {name: 'username', type: 'string'},
        {name: 'disabled', type: 'boolean'}
      ],
      datatype: 'array'
    };
  usersDataAdapter = new jqx.dataAdapter(this.usersSource);
  usersColumns: any[] =
    [
      {
        text: 'Username',
        datafield: 'username',
        align: 'center',
        width: '180px',
        cellclassname: function (row, column, value, data) {
          return data.disabled ? 'disabledItem' : '';
        },
        cellendedit: (rowNr, b, c, oldValue, newValue, f) => {
          this.onChange(rowNr, oldValue, newValue);
          return true;
        }
      },
      {
        text: 'Password',
        align: 'center',
        width: 80,
        sortable: false,
        editable: false,
        createwidget: (row: any, column: any, value: string, htmlElement: HTMLElement): void => {
          let container = document.createElement('div');
          let id = `argsRemoveButton${this.counter}`;
          container.id = id;
          container.style.border = 'none';
          htmlElement.appendChild(container);

          let options = {
            width: '100%',
            height: 27,
            template: 'default',
            imgSrc: './nexl/site/icons/keys.png',
            imgWidth: 16,
            imgHeight: 16,
            imgPosition: 'center',
            textPosition: 'center'
          };

          let resetButton = jqwidgets.createInstance(`#${id}`, 'jqxButton', options);

          resetButton.addEventHandler('click', (): void => {
            this.showToken(row.bounddata.uid);
          });

          this.counter++;
        },
        initwidget: (row: number, column: any, value: any, htmlElement: HTMLElement): void => {
        }
      },
      {
        text: 'Enable/<br/>Disable',
        align: 'center',
        sortable: false,
        editable: false,
        width: 80,
        height: 50,
        createwidget: (row: any, column: any, value: string, htmlElement: HTMLElement): void => {
          let container = document.createElement('div');
          let id = `argsEnableDisableButton${this.counter}`;
          container.id = id;
          container.style.border = 'none';
          htmlElement.appendChild(container);

          let options = {
            width: '100%',
            height: 27,
            template: 'default',
            imgSrc: './nexl/site/icons/mute.png',
            imgWidth: 16,
            imgHeight: 16,
            imgPosition: 'center',
            textPosition: 'center'
          };

          let toggleButton = jqwidgets.createInstance(`#${id}`, 'jqxButton', options);

          toggleButton.addEventHandler('click', (): void => {
            this.enableDisableUser(row);
          });

          this.counter++;
        },
        initwidget: (row: number, column: any, value: any, htmlElement: HTMLElement): void => {
        }
      },
      {
        text: 'Remove',
        align: 'center',
        width: 80,
        sortable: false,
        editable: false,
        createwidget: (row: any, column: any, value: string, htmlElement: HTMLElement): void => {
          let container = document.createElement('div');
          let id = `argsRemoveButton${this.counter}`;
          container.id = id;
          container.style.border = 'none';
          htmlElement.appendChild(container);

          let options = {
            width: '100%',
            height: 27,
            template: 'default',
            imgSrc: './nexl/site/icons/remove.png',
            imgWidth: 16,
            imgHeight: 16,
            imgPosition: 'center',
            textPosition: 'center'
          };

          let deleteButton = jqwidgets.createInstance(`#${id}`, 'jqxButton', options);

          deleteButton.addEventHandler('click', (): void => {
            this.removeUser(row.bounddata.uid);

          });

          this.counter++;
        },
        initwidget: (row: number, column: any, value: any, htmlElement: HTMLElement): void => {
        }
      }


    ];

  constructor(private http: HttpRequestService, private globalComponentsService: GlobalComponentsService, private messageService: MessageService) {
    this.messageService.getMessage().subscribe(
      (message) => {
        switch (message.type) {
          case MESSAGE_TYPE.AUTH_CHANGED: {
            this.isAdmin = message.data.isAdmin;
            return;
          }

          case MESSAGE_TYPE.USERS_WINDOW: {
            this.open();
            return;
          }
        }
      });
  }

  setGridData(data: any) {
    this.usersSource.localdata = [];

    for (let key in data) {
      this.usersSource.localdata.push({
        username: key,
        disabled: data[key].disabled
      });
    }

    this.usersGrid.updatebounddata();

  }

  open() {
    if (!this.isAdmin) {
      return;
    }

    // opening indicator
    this.globalComponentsService.loader.open();

    // loading available values from server
    this.http.post({}, REST_URLS.USERS.URLS.LIST_USERS, 'json').subscribe(
      (data: any) => {
        this.globalComponentsService.loader.close();
        this.setGridData(data.body);
        this.usersWindow.open();
      },
      err => {
        this.globalComponentsService.loader.close();
        this.globalComponentsService.messageBox.openSimple(ICONS.ERROR, `Failed to load users list. Reason : [${err.statusText}]`);
        console.log(err);
      }
    );
  }

  initContent = () => {
    this.closeButton.createComponent();
  };

  onOpen() {
  }

  setCellValueDelayed(rowNr: number, cellName: string, cellValue: string) {
    setTimeout(() => {
      this.usersGrid.setcellvalue(rowNr, cellName, cellValue);
      this.usersGrid.refresh();
    }, 10);
  }

  onChange(rowNr: number, oldValue: string, newValue: string) {
    if (!COMMON_UTILS.validateUsernameStrength(newValue)) {
      this.globalComponentsService.messageBox.openSimple(ICONS.ERROR, UI_CONSTANTS.BAD_USERNAME_MSG);
      this.setCellValueDelayed(rowNr, 'username', oldValue);
      return;
    }

    const userData = {
      newUsername: newValue,
      oldUsername: oldValue
    };

    // generating new token
    this.globalComponentsService.loader.open();

    // renaming user
    this.http.post(userData, REST_URLS.USERS.URLS.RENAME_USER, 'json').subscribe(
      (data: any) => {
        this.globalComponentsService.loader.close();
        return true;
      },
      err => {
        this.setCellValueDelayed(rowNr, 'username', oldValue);
        this.globalComponentsService.loader.close();
        this.globalComponentsService.messageBox.openSimple(ICONS.ERROR, `Failed to create a [${newValue}] user. Reason : ${err.statusText}`);
        console.log(err);
      });
  }

  addNewItem() {
    this.usersGrid.addrow(1, {});
  }

  enableDisableUser(row: any) {
    const username = this.usersGrid.getcellvalue(row.bounddata.uid, 'username');
    const isDisabled = !row.bounddata.disabled;

    if (username === undefined || username === null || username.length < 1) {
      return;
    }

    this.globalComponentsService.loader.open();

    // enabling/disabling user
    this.http.post({
      username: username,
      isDisabled: isDisabled
    }, REST_URLS.USERS.URLS.ENABLE_DISABLE_USER, 'json').subscribe(
      (data: any) => {
        row.bounddata.disabled = !row.bounddata.disabled;
        this.usersGrid.refresh();
        this.globalComponentsService.loader.close();
      },
      err => {
        this.globalComponentsService.loader.close();
        this.globalComponentsService.messageBox.openSimple(ICONS.ERROR, `Failed to enable/disable [${username}] user. Reason : ${err.statusText}`);
        console.log(err);
      });
  }

  removeUserUnner(rowNr: number, username: string) {
    this.globalComponentsService.loader.open();

    // removing user
    this.http.post({username: username}, REST_URLS.USERS.URLS.REMOVE_USER, 'json').subscribe(
      (data: any) => {
        this.usersGrid.deleterow(rowNr);
        this.globalComponentsService.loader.close();
      },
      err => {
        this.globalComponentsService.loader.close();
        this.globalComponentsService.messageBox.openSimple(ICONS.ERROR, `Failed to remove a [${username}] user. Reason : ${err.statusText}`);
        console.log(err);
      });
  }

  removeUser(rowNr: any) {
    const username = this.usersGrid.getcellvalue(rowNr, 'username');

    if (username === undefined || username === null || username.length < 1) {
      this.usersGrid.deleterow(rowNr);
      return;
    }

    // confirmation about unsaved data
    const opts = {
      title: `Confirm user remove`,
      label: `Are you sure you want to remove a [${username}] user ?`,
      callback: (callbackData: any) => {
        if (callbackData.isConfirmed !== true) {
          return;
        }

        this.removeUserUnner(rowNr, username);
      },
    };

    this.globalComponentsService.confirmBox.open(opts);
  }

  showToken(rowNr: number) {
    const username = this.usersGrid.getcellvalue(rowNr, 'username');

    if (username === undefined || username === null || username.length < 1) {
      return;
    }

    this.globalComponentsService.loader.open();

    // generating token
    this.http.post({username: username}, REST_URLS.USERS.URLS.GENERATE_REGISTRATION_TOKEN, 'json').subscribe(
      (data: any) => {
        this.globalComponentsService.loader.close();
        this.globalComponentsService.messageBox.openSimple(ICONS.INFO, `The [${username}] user can register or reset his password. Send him the following token to proceed : ${data.body.token} This token expires in [${data.body.tokenValidHours}] hour(s)`);
      },
      err => {
        this.globalComponentsService.loader.close();
        this.globalComponentsService.messageBox.openSimple(ICONS.ERROR, `Operation failed. Reason : ${err.statusText}`);
        console.log(err);
      });
  }
}
