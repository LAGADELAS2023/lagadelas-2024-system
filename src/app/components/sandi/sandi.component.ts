import { Component, OnInit, ViewChild, ElementRef, Renderer2, HostListener } from '@angular/core';
import { timer, Subscription } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sandi',
  templateUrl: './sandi.component.html',
  styleUrl: './sandi.component.scss'
})
export class SandiComponent implements OnInit {

  counter = 0;
  tick = 1000;
  countDown: Subscription;
  page: any;
  soal = [];
  responSave = [];
  account: any;
  directUrl = "pages/login";
  key1: "";
  key2: "";
  key3: "";
  key4: "";
  key5: "";
  nilai_sandi = null;
  nilai_pupuk = null;

  constructor(
    protected api: ApiService,
    private router: Router,
    private activedRouter: ActivatedRoute,
    private message: MessageService
  ) { }

  ngOnInit(): void {
    this.activedRouter.params.subscribe(params => {
      this.page = +params['pages'];
      this.initAPI(this.page);

    });
    this.counter = parseInt(localStorage.getItem('setTime'))
    this.countDown = timer(0, this.tick).subscribe(() => --this.counter);
    this.account = JSON.parse(localStorage.getItem('account'));
  }

  initAPI(key) {
    const pin = localStorage.getItem('pin');
    const params = {
      SESSION_PIN: pin,
      JENIS_SOAL : "SANDI"
    }
    this.api.getSoalSandi(key, params).then(
      (result: any) => {
        this.soal = result.data['data'];
        this.soal = this.soal.map((element, index) => {
          const nomor_soal = key;
          return { ...element, key1: '',key2:'',key3:'',key4:'',key5:'', nomor_soal };
        });

        const savedAnswer = JSON.parse(localStorage.getItem('savedAnswer'));

        this.soal.forEach(val => {
          const matchingSavedQuestion = savedAnswer.find(savedQuestion => savedQuestion.QUEST_ID == val.QUEST_ID);
          val.key1 = matchingSavedQuestion.key1;
          val.key2 = matchingSavedQuestion.key2;
          val.key3 = matchingSavedQuestion.key3;
          val.key4 = matchingSavedQuestion.key4;
          val.key5 = matchingSavedQuestion.key5;

        });
      });
  }



  generateArray(count: number): number[] {
    return Array.from({ length: count }, (_, index) => index);
  }

  isIndikatorActive(indikator: number): boolean {
    const savedAnswerString = localStorage.getItem('savedAnswer');

    if (savedAnswerString) {
      const savedAnswer = JSON.parse(savedAnswerString);
      const index = indikator + 1;

      return savedAnswer.some((soal) => soal.nomor_soal == index && soal.key1 !== null && soal.key1 !== '');
    }

    return false;
  }

  clickIndikator(keypage) {
    this.router.navigate(['../' + Math.ceil((keypage + 1))], { relativeTo: this.activedRouter });
  }

  next() {
    this.page = this.page + 1;
    this.router.navigate(['../', this.page], { relativeTo: this.activedRouter });

  }

  onInput() {
    let savedAnswer = JSON.parse(localStorage.getItem('savedAnswer')) || [];
    for (let i = 0; i < this.soal.length; i++) {
      if (this.soal[i] && this.soal[i].QUEST_ID) {
        const existingSoalIndex = savedAnswer.findIndex((item) => item.QUEST_ID === this.soal[i].QUEST_ID);

        if (existingSoalIndex !== -1) {
          savedAnswer[existingSoalIndex].key1 = this.soal[i].key1;
          savedAnswer[existingSoalIndex].key2 = this.soal[i].key2;
          savedAnswer[existingSoalIndex].key3 = this.soal[i].key3;
          savedAnswer[existingSoalIndex].key4 = this.soal[i].key4;
          savedAnswer[existingSoalIndex].key5 = this.soal[i].key5;
        } else {
          savedAnswer.push(this.soal[i]);
        }
      }
    }

    localStorage.setItem('savedAnswer', JSON.stringify(savedAnswer));
  }



  selesai() {
    let savedAnswer = JSON.parse(localStorage.getItem('savedAnswer')) || [];
    const account = JSON.parse(localStorage.getItem('account'))

    console.log(savedAnswer);
    
    // Create an array to store promises from the API calls
    let apiPromises = [];

    for (let i = 0; i < savedAnswer.length; i++) {
      let params = {
        "ID_QUESTION": savedAnswer[i].QUEST_ID,
        "USER_ID": account.id_user,
        "KATA1": savedAnswer[i].key1,
        "KATA2": savedAnswer[i].key2,
        "KATA3": savedAnswer[i].key3,
        "KATA4": savedAnswer[i].key4,
        "KATA5": savedAnswer[i].key5
      }
      console.log(params.KATA1);
      
      apiPromises.push(this.api.getTotalSkorSandi(params));
    }
    Promise.all(apiPromises)
      .then(() => {
        const params = {
          "USERNAME": "REGU_"+account.NAME,
          "SESSION_PIN": localStorage.getItem('pin'),
          "JENIS_SOAL": "SANDI",
        }
        const paramsPupuk = {
          "USERNAME": "REGU_"+account.NAME,
          "SESSION_PIN": localStorage.getItem('pin'),
          "JENIS_SOAL": "PUPUK",
        }
        this.api.getTotalSumarrySandi(params).then(
          (result: any) => {
            this.nilai_sandi = result.Nilai;
          })
        this.api.getTotalSkor(paramsPupuk).then(
          (result: any) => {
            this.nilai_pupuk = result.TotalNilaiPuk;
          })
      })
      .catch((error) => {
        // Handle errors if needed
        console.error('Error:', error);
      });
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
