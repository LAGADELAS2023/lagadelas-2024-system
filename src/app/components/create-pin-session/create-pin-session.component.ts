import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-create-pin-session',
  templateUrl: './create-pin-session.component.html',
  styleUrl: './create-pin-session.component.scss',
  providers: [MessageService]
})
export class CreatePinSessionComponent implements OnInit {

  sessionName = [
    { id: 1, name: "PUPUK" },
    { id: 2, name: "SANDI" },
    { id: 3, name: "SEMAPHORE" },
  ];
  selectedSession: any;
  dateSession: any;
  start_session: any;
  end_session: any;
  description: string;
  masterSession: any[] = [];
  selectedRowSession = {
    ID_SESSION: null,
    SESSION_PIN: null,
    SESSION_NAME: null,
    DESCRIPTION: null,
    SESSION_DATE: null,
    SESSION_START: null,
    SESSION_END: null,

  }
  editDialog = false;

  constructor(
    protected api: ApiService,
    private message: MessageService
  ) { }

  ngOnInit() {
    this.initApi()
  }

  async initApi() {
    await this.api.sessionGet().then(
      (result: any) => {
        this.masterSession = result.data;
      })
  }

  createPinSession(session_name, description, session_date, session_start, session_end) {
    const params = {
      SESSION_NAME: session_name.name,
      DESCRIPTION: description,
      SESSION_DATE: session_date,
      SESSION_START: session_start,
      SESSION_END: session_end,
    }

    this.api.createPinSession(params).then(
      (result: any) => {
        this.message.add({
          severity: "success",
          summary: "SUCCESS",
          detail: "Berhasil membuat PIN sesi :)"
        })
        this.ngOnInit()
      }).catch(
        (error: any) => {

        })
  }

  editSession(a) {
    this.selectedRowSession = { ...a };
    this.editDialog = true;
    console.log(this.selectedRowSession);

  }
}
