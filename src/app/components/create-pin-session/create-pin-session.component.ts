import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/service/api.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-create-pin-session',
  templateUrl: './create-pin-session.component.html',
  styleUrl: './create-pin-session.component.scss',
  providers: [MessageService, DatePipe]
})
export class CreatePinSessionComponent implements OnInit {

  sessionName = [
    "PUPUK-SANDI",
    "SEMBOYAN",
  ];
  selectedSession: any;
  dateSession: Date;
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
    private message: MessageService,
    private datePipe: DatePipe
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
      SESSION_NAME: session_name,
      DESCRIPTION: description,
      SESSION_DATE: this.datePipe.transform(session_date, 'yyyy-MM-dd'),
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

        this.selectedSession = null;
        this.description = null;
        this.start_session = null;
        this.end_session = null;
        this.dateSession = null;

        this.ngOnInit()
      }).catch(
        (error: any) => {

        })
  }

  editSession(a) {
    this.selectedRowSession = { ...a };
    this.selectedRowSession.SESSION_DATE = this.datePipe.transform(
      this.selectedRowSession.SESSION_DATE,
      'yyyy-MM-dd'
    );
    this.editDialog = true;
    console.log(this.selectedRowSession);


  }

  updateSession() {
    this.selectedRowSession.SESSION_DATE = this.datePipe.transform(
      this.selectedRowSession.SESSION_DATE,
      'yyyy-MM-dd'
    );
    this.api.updateSession(this.selectedRowSession).then(
      (result: any) => {
        this.message.add({
          severity: "success",
          summary: "SUCCESS",
          detail: "Berhasil melakukan update PIN Sesi"
        })
        this.editDialog = false;
        this.ngOnInit()
      }).catch(
        (error: any) => {
          this.message.add({
            severity: "error",
            summary: "FAILED",
            detail: "Gagal melakukan update PIN Sesi"
          })
        })
  }
}
