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
  gambarPertanyaan: any;

  constructor(
    protected api: ApiService,
    private message: MessageService,
  ) { }

  ngOnInit(): void {

  }

  onUpload(event: UploadEvent) {
    this.message.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
    console.log(event);

  }

  onFileChange(event: any): void {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.gambarPertanyaan = reader.result as string;
        console.log(this.gambarPertanyaan);

      };
    }
  }

  createSoalPupuk(event: UploadEvent) {
    if (this.answerKey == undefined || this.QUESTIONTEXT == undefined || this.OPTIONTEXT1 == undefined || this.OPTIONTEXT2 == undefined || this.OPTIONTEXT3 == undefined || this.OPTIONTEXT4 == undefined) {
      this.message.add({
        severity: "error",
        summary: 'ATTENTION',
        detail: 'Tidak boleh ada yang kosong'
      })
    } else {
      let correctAnswerIndex = this.answerKey;
      let options = [
        { OPTIONS_TEXT: this.OPTIONTEXT1, VALUE: 0 },
        { OPTIONS_TEXT: this.OPTIONTEXT2, VALUE: 0 },
        { OPTIONS_TEXT: this.OPTIONTEXT3, VALUE: 0 },
        { OPTIONS_TEXT: this.OPTIONTEXT4, VALUE: 0 },
      ];

      if (correctAnswerIndex >= 1 && correctAnswerIndex <= 4) {
        options[correctAnswerIndex - 1].VALUE = 1;
      }

      let params = {
        QUESTION_TEXT: this.QUESTIONTEXT,
        SESSION_PIN: 1818,
        OPTIONS: options,
      };
      console.log(this.gambarPertanyaan);




      // this.api.createSoalPupuk(params).then(
      //   (result: any) => {
      //     this.message.add({
      //       severity: "success",
      //       summary: 'SUCCESS',
      //       detail: 'Masuk nichh, Pargoy dulu'
      //     })
      //     this.QUESTIONTEXT = "";
      //     this.OPTIONTEXT1 = "";
      //     this.OPTIONTEXT2 = "";
      //     this.OPTIONTEXT3 = "";
      //     this.OPTIONTEXT4 = "";
      //   }).catch(
      //     (error: any) => {
      //       this.message.add({
      //         severity: "error",
      //         summary: 'FAILED',
      //         detail: 'Gagal nichh, Pasti belum pargoy'
      //       })
      //     })
    }
  }

}
