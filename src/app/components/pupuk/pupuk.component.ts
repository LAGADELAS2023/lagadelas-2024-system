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
  selectedOption: any[] = [];
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
    this.setInitialSelectedOptions();
  }
  ngOnDestroy() {
    this.countDown = null;
  }

  initAPI(key) {
    this.api.soalPupuk(key).then(
      (result: any) => {
        this.soal = result.data['data'];
        // console.log(this.soal);

      })
  }

  setInitialSelectedOptions(): void {
    const savedSoal = localStorage.getItem('soal');
    let soal = JSON.parse(savedSoal);
    console.log(soal);

    soal.forEach(question => {
      if (question) {
        this.selectedOption = question.OPTIONS[0];
        console.log(question.selectedOption);

      }
    });
  }



  nextQuestion() {
    this.page = this.page + 1;
    this.router.navigate(['../', this.page], { relativeTo: this.activedRouter });
  }

  clickIndikator(keypage) {
    this.router.navigate(['../' + Math.ceil((keypage + 1) / 2)], { relativeTo: this.activedRouter });
  }

  onClickOption(questionId: string, optionId: string): void {
    // Find the question in 'soal' based on 'questionId'
    const question = this.soal.find(item => item.QUEST_ID === questionId);

    // Update the selected option for the question
    if (question) {
      question.selectedOption = optionId;

      // Save the updated 'soal' array to localStorage
      localStorage.setItem('soal', JSON.stringify(this.soal));
    }
  }

  generateArray(count: number): number[] {
    return Array.from({ length: count }, (_, index) => index);
  }

  // @HostListener('document:visibilitychange', ['$event'])
  // handleTabFocusChange(event: Event): void {
  //   if (document.visibilityState === 'visible') {
  //     this.router.navigate([this.directUrl]);
  //   }
  // }
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
