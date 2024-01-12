import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/service/api.service';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-generatepupuk',
  templateUrl: './generatepupuk.component.html',
  styleUrls: ['./generatepupuk.component.scss'],
  providers: [MessageService]
})
export class GeneratepupukComponent implements OnInit {

  answerKey: any;
  QUESTIONTEXT: any;
  OPTIONTEXT1: any;
  OPTIONTEXT2: any;
  OPTIONTEXT3: any;
  OPTIONTEXT4: any;
  gambarPertanyaan: any = null;
  gambarOption1: any = null;
  gambarOption2: any = null;
  gambarOption3: any = null;
  gambarOption4: any = null;
  masterSession = [];
  selectedSession: any

  value: number = 0;

  constructor(
    protected api: ApiService,
    private message: MessageService,
  ) { }

  ngOnInit(): void {
    this.api.sessionGet().then(
      (result: any) => {
        this.masterSession = result.data;
      })
  }

  onUpload(event: UploadEvent) {
    this.message.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
    console.log(event);

  }

  onFileChange(event: any, key): void {
    console.log(key);

    if (key == 0) {
      const reader = new FileReader();

      if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);

        reader.onload = () => {
          this.gambarPertanyaan = reader.result as string;
          console.log(this.gambarPertanyaan);

        };
      }
    } else if (key == 1) {
      const reader = new FileReader();

      if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);

        reader.onload = () => {
          this.gambarOption1 = reader.result as string;
          console.log(this.gambarOption1);

        };
      }
    } else if (key == 2) {
      const reader = new FileReader();

      if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);

        reader.onload = () => {
          this.gambarOption2 = reader.result as string;
          console.log(this.gambarOption2);

        };
      }
    } else if (key == 4) {
      const reader = new FileReader();

      if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);

        reader.onload = () => {
          this.gambarOption4 = reader.result as string;
          console.log(this.gambarOption4);

        };
      }
    } else {
      const reader = new FileReader();

      if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);

        reader.onload = () => {
          this.gambarOption3 = reader.result as string;
          console.log(this.gambarOption3);

        };
      }
    }

  }

  createSoalPupuk(event: UploadEvent) {
    // if (this.answerKey == undefined || this.QUESTIONTEXT == undefined || this.OPTIONTEXT1 == undefined || this.OPTIONTEXT2 == undefined || this.OPTIONTEXT3 == undefined || this.OPTIONTEXT4 == undefined) {
    if (this.answerKey == undefined || this.QUESTIONTEXT == undefined) {
      this.message.add({
        severity: "error",
        summary: 'ATTENTION',
        detail: 'Tidak boleh ada yang kosong'
      })
    } else {
      let correctAnswerIndex = this.answerKey;
      let options = [
        { OPTIONS_TEXT: this.OPTIONTEXT1 || null, VALUE: 0, OPTIONS_IMAGE: this.gambarOption1 },
        { OPTIONS_TEXT: this.OPTIONTEXT2 || null, VALUE: 0, OPTIONS_IMAGE: this.gambarOption2 },
        { OPTIONS_TEXT: this.OPTIONTEXT3 || null, VALUE: 0, OPTIONS_IMAGE: this.gambarOption3 },
        { OPTIONS_TEXT: this.OPTIONTEXT4 || null, VALUE: 0, OPTIONS_IMAGE: this.gambarOption4 },
      ];

      if (correctAnswerIndex >= 1 && correctAnswerIndex <= 4) {
        options[correctAnswerIndex - 1].VALUE = 1;
      }

      let params = {
        QUESTION_TEXT: this.QUESTIONTEXT,
        QUESTION_IMAGE: this.gambarPertanyaan,
        SESSION_PIN: this.selectedSession.SESSION_PIN,
        OPTIONS: options,
      };
      console.log(params);
      this.api.createSoalPupuk(params).then(
        (result: any) => {
          this.message.add({
            severity: "success",
            summary: 'SUCCESS',
            detail: 'Masuk nichh, Pargoy dulu'
          })
          this.QUESTIONTEXT = "";
          this.OPTIONTEXT1 = "";
          this.OPTIONTEXT2 = "";
          this.OPTIONTEXT3 = "";
          this.OPTIONTEXT4 = "";
        }).catch(
          (error: any) => {
            this.message.add({
              severity: "error",
              summary: 'FAILED',
              detail: 'Gagal nichh, Pasti belum pargoy'
            })
          })
    }
  }


}
