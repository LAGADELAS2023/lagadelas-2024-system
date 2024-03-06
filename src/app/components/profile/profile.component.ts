import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{


  account : any;
  password : string;
  password_old : string;
  password_return : string;

  constructor(
    private message: MessageService
  ){ }
  
  ngOnInit(): void {
      this.account = JSON.parse(localStorage.getItem('account'))
  }

  simpanPassword(){
    
    if (this.password != this.password_return) {
      this.message.add({
        severity:'warn',
        summary: 'PERHATIAN',
        detail:'password tidak sama'
      })
    }
  }
}
