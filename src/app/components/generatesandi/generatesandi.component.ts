import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-generatesandi',
  templateUrl: './generatesandi.component.html',
  styleUrl: './generatesandi.component.scss',
  providers: [MessageService]
})
export class GeneratesandiComponent implements OnInit {

  gambarPertanyaan: any;
  answerKey: any;
  key: any;
  masterSession = [];
  selectedSession: any

  constructor(
    protected api: ApiService,
    private message: MessageService
  ) {

  }


  ngOnInit(): void {
    this.api.sessionGet().then(
      (result: any) => {
        this.masterSession = result.data;
      })
  }

  onFileChange(event: any, key): void {
    console.log(key);
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

  protected postSoalSandi() {
    const params = {
      "QUESTION_TEXT": this.key,
      "SESSION_PIN": this.selectedSession.SESSION_PIN,
      "QUESTION_IMAGE": this.gambarPertanyaan,
      "ANSWER_TEXT": this.answerKey
    }
    this.api.soalSandi(params).then(
      (result: any) => {
        this.message.add({
          severity: 'success',
          summary: 'SUCCESS',
          detail: 'Berhasil menambahkan soal sandi'
        })
      }).catch(
        (error: any) => {
          this.message.add({
            severity: 'error',
            summary: 'FAILED',
            detail: 'Gagal menambahkan soal sandi'
          })
        })
  }
}