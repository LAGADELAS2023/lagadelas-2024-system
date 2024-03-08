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
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.gambarPertanyaan = reader.result as string;
      };
    }
  }

  protected postSoalSandi() {
    let answerkeyArray =this.answerKey.split(' ');
    if (answerkeyArray.length < 5) {
      this.message.add({
        severity: 'error',
        summary: 'FAILED',
        detail: 'Kunci jawaban Kurang dari 5 kata'
      })
    } else if (answerkeyArray.length > 5){
      this.message.add({
        severity: 'error',
        summary: 'FAILED',
        detail: 'Kunci jawaban Lebih dari 5 kata'
      })
    } else {
      const params = { 
        "QUESTION_TEXT": this.key,
        "SESSION_PIN": this.selectedSession.SESSION_PIN,
        "QUESTION_IMAGE": this.gambarPertanyaan,
        "K1": answerkeyArray[0],
        "K2": answerkeyArray[1],
        "K3": answerkeyArray[2],
        "K4": answerkeyArray[3],
        "K5": answerkeyArray[4],
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
}