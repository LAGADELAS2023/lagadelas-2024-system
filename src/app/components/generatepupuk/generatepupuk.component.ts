import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-generatepupuk',
  templateUrl: './generatepupuk.component.html',
  styleUrls: ['./generatepupuk.component.scss']
})
export class GeneratepupukComponent implements OnInit {

  answerKey: any;
  QUESTIONTEXT: any;
  OPTIONTEXT1: any;
  OPTIONTEXT2: any;
  OPTIONTEXT3: any;
  OPTIONTEXT4: any;

  constructor(
    protected api: ApiService,
  ) { }

  ngOnInit(): void {

  }

  createSoalPupuk() {
    let params = {
      ID_QUESTION: "Q6",
      QUESTION_TEXT: this.QUESTIONTEXT,
      SESSION: 1,
      OPTIONS: [
        {
          ID_OPTIONS: "OP21",
          ID_QUESTION: "Q6",
          OPTIONS_TEXT: this.OPTIONTEXT1
        },
        {
          ID_OPTIONS: "OP22",
          ID_QUESTION: "Q6",
          OPTIONS_TEXT: this.OPTIONTEXT2
        },
        {
          ID_OPTIONS: "OP23",
          ID_QUESTION: "Q6",
          OPTIONS_TEXT: this.OPTIONTEXT3
        },
        {
          ID_OPTIONS: "OP24",
          ID_QUESTION: "Q6",
          OPTIONS_TEXT: this.OPTIONTEXT4
        },
      ],
      KUNCI_JAWABAN: "OP24"
    }

    this.api.createSoalPupuk(params)
  }

}
