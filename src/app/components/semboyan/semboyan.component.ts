import { Component, OnInit, ViewChild, ElementRef, Renderer2, HostListener } from '@angular/core';
import { timer, Subscription } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-semboyan',
  templateUrl: './semboyan.component.html',
  styleUrls: ['./semboyan.component.scss']
})
export class SemboyanComponent implements OnInit {

  counter = 180;
  tick = 1000;
  countDown: Subscription;
  page: any;
  soal = [];
  responSave = [];
  directUrl = "pages/login";
  videoSource = null;
  audioSource = null;
  video = false;
  audio = false;
  videoCounter = 0;
  audioCounter = 0;
  quest_id_smp = "";
  quest_id_mr = "";
  answerMorse = "";
  answerSemaphore = "";
  blockedDocument = true;
  account : any;
  
  @ViewChild('videoPlayer') videoplayer: ElementRef;
  @ViewChild('audioPlayer') audioPlayer: ElementRef;

  constructor(
    protected api: ApiService,
    private router: Router,
    private activedRouter: ActivatedRoute,
    private message: MessageService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    const audio = localStorage.getItem('audioCounter');
    const video = localStorage.getItem('videoCounter');

    Number.isNaN(parseInt(audio)) ? this.audioCounter = 0 : this.audioCounter = parseInt(audio);
    Number.isNaN(parseInt(video)) ? this.videoCounter = 0 : this.videoCounter = parseInt(video);
    this.account = JSON.parse(localStorage.getItem('account'));

    if (this.account == null ||this.account == undefined) {
      this.router.navigate(['/pages/login'])
    }

    this.activedRouter.params.subscribe(params => {
      this.page = +params['pages'];
      this.initAPI();
    });
  }

  initAPI() {
    const pin = localStorage.getItem('pin');
    const params = {
      SESSION_PIN: pin
    }
    this.api.soalSemboyan(params).then(
      (result: any) => {
        this.blockedDocument = false;
        this.countDown = timer(0, this.tick).subscribe(() => {
          if (this.counter === 0) {
            this.saveJawaban();
          }
          this.counter--;
        });
        this.videoSource = result.data[0].QUESTION_IMAGE;
        this.quest_id_smp = result.data[0].ID_QUESTION;
        this.audioSource = result.data[1].QUESTION_IMAGE;
        this.quest_id_mr = result.data[1].ID_QUESTION;
      }
    );    
  }

  generateArray(count: number): number[] {
    return Array.from({ length: count }, (_, index) => index);
  }

  showVideo() {
    this.videoCounter++
    localStorage.setItem('videoCounter', this.videoCounter.toLocaleString());
    this.video = true; // Tampilkan video
    // Tambahkan event listener untuk mendeteksi ketika video selesai diputar
    this.renderer.listen(this.videoplayer.nativeElement, 'ended', () => {
      this.video = false; // Set video ke false ketika pemutaran video selesai
    });
    // Mulai pemutaran video
    this.videoplayer.nativeElement.play();
  }

  showAudio() {
    this.audioCounter++
    localStorage.setItem('audioCounter', this.audioCounter.toLocaleString());
    this.audio = true; // Tampilkan video
    // Tambahkan event listener untuk mendeteksi ketika video selesai diputar
    this.renderer.listen(this.audioPlayer.nativeElement, 'ended', () => {
      this.audio = false; // Set video ke false ketika pemutaran video selesai
    });
    // Mulai pemutaran video
    this.audioPlayer.nativeElement.play();
  }

  saveJawaban(){
    let semaphore = this.answerSemaphore.split(' ');
    let semboyan = this.answerMorse.split(' ');

    let counter = this.counter; // Satuan menit
    let seconds = counter * 60;

    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let remainingSeconds = seconds % 60;

    // Format output HH:MM:SS
    let formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;

    console.log("Waktu dalam format HH:MM:SS:", formattedTime);

    const paramsSemaphore = {
      "ID_QUESTION": this.quest_id_smp,
      "USER_ID": this.account.id_user,
      "COUNTDOWN" : counter,
      "JENIS_SOAL": "SEMAPHORE",
      "KATA1": semaphore[1] || "",
      "KATA2": semaphore[2] || "",
      "KATA3": semaphore[3] || "",
      "KATA4": semaphore[4] || "",
      "KATA5": semaphore[5] || "",
      "KATA6": semaphore[6] || "",
      "KATA7": semaphore[7] || "",
      "KATA8": semaphore[8] || "",
      "KATA9": semaphore[9] || "",
      "KATA10": semaphore[10] || "",
    }

    const paramsMorse = {
      "ID_QUESTION": this.quest_id_smp,
      "USER_ID": this.account.id_user,
      "JENIS_SOAL": "MORSE",
      "COUNTDOWN" : counter,
      "KATA1": semboyan[1] || "",
      "KATA2": semboyan[2] || "",
      "KATA3": semboyan[3] || "",
      "KATA4": semboyan[4] || "",
      "KATA5": semboyan[5] || "",
      "KATA6": semboyan[6] || "",
      "KATA7": semboyan[7] || "",
      "KATA8": semboyan[8] || "",
      "KATA9": semboyan[9] || "",
      "KATA10": semboyan[10] || "",
    }

    this.api.postJawabanSemboyan(paramsSemaphore).then((result : any)=> {
      this.api.postJawabanSemboyan(paramsMorse).then((result : any)=> {
        const paramsPost = {
          "USERNAME": "REGU_"+this.account.NAME,
          "SESSION_PIN": localStorage.getItem('pin'),
          "JENIS_SOAL": "SEMBOYAN",
        }
        this.api.getTotalSumarrySemboyan(paramsPost).then((result : any)=> {
          this.router.navigate(['/pages/login'])
        })
      })
    })
  }

  @HostListener('document:visibilitychange', ['$event'])
  handleTabFocusChange(event: Event): void {
    if (document.visibilityState === 'visible') {
      this.router.navigate([this.directUrl]);
      localStorage.setItem('setTime', String(this.counter))
    }
  }
}

@Pipe({
  name: 'formatTime',
})
export class FormatTimePipe implements PipeTransform {
  transform(value: number): string {
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);
    const seconds = Math.floor(value % 60);

    const formattedHours = ('00' + hours).slice(-2);
    const formattedMinutes = ('00' + minutes).slice(-2);
    const formattedSeconds = ('00' + seconds).slice(-2);

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
}
