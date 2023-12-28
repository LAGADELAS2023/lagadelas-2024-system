import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-pin-session',
  templateUrl: './create-pin-session.component.html',
  styleUrl: './create-pin-session.component.scss'
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

  constructor(

  ) { }

  ngOnInit() {

  }
}
