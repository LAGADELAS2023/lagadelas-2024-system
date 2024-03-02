import { Component, OnInit } from '@angular/core';
import { Observable, Observer, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {


  onlineMessage;

  constructor() {
    this.createOnline$().subscribe((isOnline) => {
      console.log(isOnline);
      if (isOnline) {
        this.onlineMessage = 'ONLINE';
        
      } else {
        this.onlineMessage =
        'OFFLINE';
      }
    });
  }


  ngOnInit(): void {
      
  }

  createOnline$() {
    return merge(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      })
    );
  }
}
