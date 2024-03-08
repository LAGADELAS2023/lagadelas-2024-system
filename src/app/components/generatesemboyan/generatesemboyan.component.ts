import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-generatesemboyan',
  templateUrl: './generatesemboyan.component.html',
  styleUrl: './generatesemboyan.component.scss'
})
export class GeneratesemboyanComponent implements OnInit{

  gambarPertanyaan: any = null;
  audioMorse : any = null;
  answerKey: any = "";
  key: any;
  masterSession = [];
  selectedSession: any;
  answerKeyMorse : any = "";
  blockedDocument= false;

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

  onMorseChange(event: any, key): void {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.audioMorse = reader.result as string;
      };
    }
  }

  protected postSoalSemboyan() {
    this.blockedDocument =true;
    if (this.answerKey == "" || this.answerKeyMorse == "" || this.gambarPertanyaan == null || this.audioMorse == null) {
      this.blockedDocument = false;
      this.message.add({
        severity : 'warn',
        summary : 'PERHATIAN',
        detail : 'Semua data wajib diisi'
      });
    } else {
    let jawabanSemaphore = this.answerKey.split(' ');
    let jawabanMorse = this.answerKeyMorse.split(' ');
    if (jawabanMorse.length < 10 || jawabanMorse.length > 10) {
      this.message.add({
        severity : 'warn',
        summary : 'PERHATIAN',
        detail : 'Panjang Jawaban Morse Kurang atau Lebih'
      });
      this.blockedDocument = false;
    } else if (jawabanSemaphore.length < 10 || jawabanSemaphore.length > 10) {
      this.message.add({
        severity : 'warn',
        summary : 'PERHATIAN',
        detail : 'Panjang Jawaban Morse Kurang atau Lebih'
      });
      this.blockedDocument = false;
    } else {      
      const paramsSemaphore = {
        QUESTION_TEXT : "SOAL SEMAPHORE",
        SESSION_PIN : this.selectedSession.SESSION_PIN,
        QUESTION_IMAGE : this.gambarPertanyaan,
        K1 : jawabanSemaphore[0],
        K2 : jawabanSemaphore[1],
        K3 : jawabanSemaphore[2],
        K4 : jawabanSemaphore[3],
        K5 : jawabanSemaphore[4],
        K6 : jawabanSemaphore[5],
        K7 : jawabanSemaphore[6],
        K8 : jawabanSemaphore[7],
        K9 : jawabanSemaphore[8],
        K10 : jawabanSemaphore[9],
        JENIS_SOAL : "SEMAPHORE" 
      }
  
      const paramsMorse = {
        QUESTION_TEXT : "SOAL MORSE",
        SESSION_PIN : this.selectedSession.SESSION_PIN,
        QUESTION_IMAGE : this.audioMorse,
        K1 : jawabanMorse[0],
        K2 : jawabanMorse[1],
        K3 : jawabanMorse[2],
        K4 : jawabanMorse[3],
        K5 : jawabanMorse[4],
        K6 : jawabanMorse[5],
        K7 : jawabanMorse[6],
        K8 : jawabanMorse[7],
        K9 : jawabanMorse[8],
        K10 : jawabanMorse[9],
        JENIS_SOAL : "MORSE" 
      }
  
      console.log(paramsSemaphore);
      console.log(paramsMorse);
      
      this.api.sendSemboyan(paramsSemaphore).then((result : any)=>{
        this.api.sendSemboyan(paramsMorse).then((result : any)=>{
          this.message.add({
            severity : 'success',
            summary : 'BERHASIL',
            detail : 'Berhasil menyimpan soal'
          })
          this.blockedDocument = false;
        }).catch(error => {
          this.message.add({
            severity : 'error',
            summary : 'GAGAL',
            detail : 'Gagal menyimpan soal'
          });
          this.blockedDocument = false;
        })
      }).catch(error => {
          this.message.add({
            severity : 'error',
            summary : 'GAGAL',
            detail : 'Gagal menyimpan soal'
          });
          this.blockedDocument = false;
        })
      }
    }      
  }

}
