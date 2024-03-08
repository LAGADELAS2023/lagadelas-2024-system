import { Component, OnInit } from '@angular/core';
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

  counter = 7200;
  tick = 1000;
  countDown: Subscription;
  page: any;
  soal = [];
  responSave = [];

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

        this.soal.forEach(val => {
          const matchingSavedQuestion = savedAnswer.find(savedQuestion => savedQuestion.QUEST_ID == val.QUEST_ID);
          val.TextAnswer = matchingSavedQuestion.TextAnswer;

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

      return savedAnswer.some((soal) => soal.nomor_soal == index && soal.TextAnswer !== null && soal.TextAnswer !== '');
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
          savedAnswer[existingSoalIndex].TextAnswer = this.soal[i].TextAnswer;
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

    // Create an array to store promises from the API calls
    let apiPromises = [];

    for (let i = 0; i < savedAnswer.length; i++) {
      const answer = savedAnswer[i].TextAnswer.split(' ')
      let params = {
        "ID_QUESTION": savedAnswer[i].QUEST_ID,
        "ID_USER": account.ID,
        "KATA1": answer[0],
        "KATA2": answer[1],
        "KATA3": answer[2],
        "KATA4": answer[3],
        "KATA5": answer[4]
      }

      apiPromises.push(this.api.getTotalSkorSandi(params));
    }
    Promise.all(apiPromises)
      .then(() => {
        const params = {
          "USERNAME": account.USERNAME,
          "SESSION_PIN": localStorage.getItem('pin')
        }
        this.api.skorSandi(params).then(
          (result: any) => {

          })
      })
      .catch((error) => {
        // Handle errors if needed
        console.error('Error:', error);
      });
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
