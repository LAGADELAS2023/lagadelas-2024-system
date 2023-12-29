import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { timer, Subscription } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-pupuk',
  templateUrl: './pupuk.component.html',
  styleUrl: './pupuk.component.scss'
})
export class PupukComponent implements OnInit, OnDestroy {

  countDown: Subscription;
  counter = 60;
  tick = 1000;
  soal = [];
  directUrl = "pages/login";
  page: number;

  constructor(
    protected api: ApiService,
    private router: Router,
    private activedRouter: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activedRouter.params.subscribe(params => {
      this.page = +params['pages'];
      this.initAPI(this.page);
      console.log(this.page);

    });
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
  ngOnDestroy() {
    this.countDown = null;
  }

  initAPI(key) {
    this.api.soalPupuk(key).then(
      (result: any) => {
        this.soal = result.data['data'];
        this.soal = this.soal.map((element) => {
          return { ...element, selectedOption: null };
        });
        const savedSoal = JSON.parse(localStorage.getItem('savedSoal'));
        this.soal.forEach(val => {
          const matchingSavedQuestion = savedSoal.find(savedQuestion => savedQuestion.QUEST_ID == val.QUEST_ID);
          val.selectedOption = matchingSavedQuestion.selectedOption;
        });
        console.log(this.soal);

      })
  }

  isIndikatorActive(indikator: number): boolean {
    const savedSoalString = localStorage.getItem('savedSoal');
    if (savedSoalString) {
      const savedSoal = JSON.parse(savedSoalString);
      const index = indikator + 1;
      return savedSoal.some((soal) => soal.QUEST_ID === "Q" + index && soal.selectedOption !== null);
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
    } else {
      localStorage.setItem('savedSoal', JSON.stringify(this.soal));
    }
    this.soal.forEach((val) => {
      console.log(val.OPTIONS[val.selectedOption]);
    });
  }



  generateArray(count: number): number[] {
    return Array.from({ length: count }, (_, index) => index);
  }

  @HostListener('document:visibilitychange', ['$event'])
  handleTabFocusChange(event: Event): void {
    if (document.visibilityState === 'visible') {
      this.router.navigate([this.directUrl]);
    }
  }
}

@Pipe({
  name: 'formatTime',
})
export class FormatTimePipe implements PipeTransform {
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return (
      ('00' + minutes).slice(-2) +
      ':' +
      ('00' + Math.floor(value - minutes * 60)).slice(-2)
    );
  }
}
