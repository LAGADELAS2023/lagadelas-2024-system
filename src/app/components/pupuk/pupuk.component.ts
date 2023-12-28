import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { timer, Subscription } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';



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
  selectedOption: any;
  directUrl = "pages/login";
  page = 1

  constructor(
    protected api: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initAPI(this.page)
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
        console.log(this.soal);

      })
  }

  nextQuestion() {
    this.page = this.page + 1;
    this.ngOnInit()
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
