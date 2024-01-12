import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { timer, Subscription } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-pupuk',
  templateUrl: './pupuk.component.html',
  styleUrl: './pupuk.component.scss',
  providers: [MessageService]
})
export class PupukComponent implements OnInit, OnDestroy {

  countDown: Subscription;
  counter = 0;
  tick = 1000;
  soal = [];
  directUrl = "pages/login";
  page: number;
  skor = false;
  nilai_akhir: any;
  value: number = 0;

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
      console.log(this.page);

    });
    let time: any = localStorage.getItem('setTime');
    console.log(time);

    if (time == null) {
      this.counter = 7200;
      localStorage.setItem('setTime', "7200")
      this.countDown = timer(0, this.tick).subscribe((count) => {
        if (this.counter == 0 && count) {
          console.log('timer completed', count, this.counter);
          if (this.countDown) {
            this.countDown.unsubscribe();
          }
        }
        --this.counter;
      });
    } else {
      this.counter = ++time;
      this.countDown = timer(0, this.tick).subscribe((count) => {
        if (this.counter == 0 && count) {
          console.log('timer completed', count, this.counter);
          if (this.countDown) {
            this.countDown.unsubscribe();
          }
        }
        --this.counter;
      });
    }
  }
  ngOnDestroy() {
    this.countDown = null;
  }

  initAPI(key) {
    const pin = localStorage.getItem('pin');
    const params = {
      SESSION_PIN: pin
    }
    this.api.soalPupuk(key, params).then(
      (result: any) => {
        this.soal = result.data['data'];
        this.soal = this.soal.map((element, index) => {
          const nomor_soal = (key * 2 - 1 + index + 1) - 1; // Adjust the formula for numbering
          return { ...element, selectedOption: null, nomor_soal };
        });

        const savedSoal = JSON.parse(localStorage.getItem('savedSoal'));
        this.soal.forEach(val => {
          const matchingSavedQuestion = savedSoal.find(savedQuestion => savedQuestion.QUEST_ID == val.QUEST_ID);
          val.selectedOption = matchingSavedQuestion.selectedOption;
        });
        console.log(this.soal);
      });
  }


  isIndikatorActive(indikator: number): boolean {
    const savedSoalString = localStorage.getItem('savedSoal');

    if (savedSoalString) {
      const savedSoal = JSON.parse(savedSoalString);
      const index = indikator + 1;

      return savedSoal.some((soal) => soal.nomor_soal == index && soal.selectedOption !== null);
    }

    return false;
  }


  nextQuestion() {
    this.page = this.page + 1;
    this.router.navigate(['../', this.page], { relativeTo: this.activedRouter });
  }

  clickIndikator(keypage) {
    this.router.navigate(['../' + Math.ceil((keypage + 1) / 2)], { relativeTo: this.activedRouter });
  }

  onClickOption(): void {
    // Mengambil data yang sudah ada dari localStorage
    const savedSoalString = localStorage.getItem('savedSoal');

    // Jika data sudah ada
    if (savedSoalString) {
      const savedSoal = JSON.parse(savedSoalString);
      for (let i = 0; i < this.soal.length; i++) {
        const existingSoalIndex = savedSoal.findIndex((item) => item.QUEST_ID === this.soal[i].QUEST_ID);
        if (existingSoalIndex !== -1) {
          savedSoal[existingSoalIndex].OPTIONS = this.soal[i].OPTIONS;
          savedSoal[existingSoalIndex].selectedOption = this.soal[i].selectedOption;
        } else {
          savedSoal.push(this.soal[i]);
        }
      }
      localStorage.setItem('savedSoal', JSON.stringify(savedSoal));
      localStorage.setItem('setTime', JSON.stringify(this.counter));
    } else {
      localStorage.setItem('savedSoal', JSON.stringify(this.soal));
    }
    this.soal.forEach((val) => {
      console.log(val.OPTIONS[val.selectedOption]);
    });
  }

  protected responseSave(q, a, t) {
    const account = JSON.parse(localStorage.getItem('account'))
    const params = {
      ID_QUESTION: q,
      ID_OPTIONS: a,
      ID_USER: account.ID,
      TIMECOUNTDOWN: t,
    }

    this.message.clear()
    this.api.saveResponse(params).then(
      (ressult: any) => {
        this.message.add({
          severity: "success",
          summary: "SUCCESS",
          detail: "Jawaban Tersimpan"
        })
      }).catch(
        (error: any) => {
          this.message.add({
            severity: "error",
            summary: "FAILED",
            detail: "Jawaban tidak tersimpan"
          })
        })
  }

  getSkor() {
    const account = JSON.parse(localStorage.getItem('account'));
    const params = {
      USERNAME: account.USERNAME,
    }

    this.api.getTotalSkor(params).then(
      (ress: any) => {
        this.skor = true;
        localStorage.removeItem('savedSoal');
        localStorage.removeItem('setTime');
        this.nilai_akhir = ress.data[0];
        let interval = setInterval(() => {
          this.value = this.value + Math.floor(Math.random() * 5) + 1;
          if (this.value >= 100) {
            this.value = 100;
            this.router.navigate([this.directUrl]);
            clearInterval(interval);
          }
        }, 500);
      }).catch(
        (err: any) => {
          this.message.add({
            severity: 'error',
            summary: 'GAGAL !',
            detail: 'Terjadi kesalahan pada server.'
          })
        })
  }

  generateArray(count: number): number[] {
    return Array.from({ length: count }, (_, index) => index);
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

