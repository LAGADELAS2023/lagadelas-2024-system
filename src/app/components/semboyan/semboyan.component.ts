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

  counter = 7200;
  tick = 1000;
  countDown: Subscription;
  page: any;
  soal = [];
  responSave = [];
  directUrl = "pages/login";
  videoSource = "./assets/video/soal_senaphore_1.mp4";
  audioSource = "./assets/audio/soal_morse.mp3";
  video = false;
  audio = false;
  videoCounter = 0;
  audioCounter = 0;
  answerSandi = "";
  answerSemaphore = "";
  
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

    parseInt(audio) == null ? this.audioCounter = 0 : this.audioCounter = parseInt(audio);
    Number.isNaN(parseInt(video)) ? this.videoCounter = 0 : this.videoCounter = parseInt(video);
    
    this.activedRouter.params.subscribe(params => {
      this.page = +params['pages'];
      this.initAPI(this.page);
    });
    this.countDown = timer(0, this.tick).subscribe(() => --this.counter);
  }

  initAPI(key) {
    const pin = localStorage.getItem('pin');
    const params = {
      SESSION_PIN: pin
    }
    this.api.getSoalSandi(key, params).then(
      (result: any) => {
        this.soal = result.data['data'];
        this.soal = this.soal.map((element, index) => {
          const nomor_soal = key;
          return { ...element, TextAnswer: '', nomor_soal };
        });

        const savedAnswer = JSON.parse(localStorage.getItem('savedAnswer'));
        console.log(savedAnswer);

        this.soal.forEach(val => {
          const matchingSavedQuestion = savedAnswer.find(savedQuestion => savedQuestion.QUEST_ID == val.QUEST_ID);
          val.TextAnswer = matchingSavedQuestion.TextAnswer;
        });
      });
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

  // @HostListener('document:visibilitychange', ['$event'])
  // handleTabFocusChange(event: Event): void {
  //   if (document.visibilityState === 'visible') {
  //     this.router.navigate([this.directUrl]);
  //     localStorage.setItem('setTime', String(this.counter))
  //   }
  // }
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
