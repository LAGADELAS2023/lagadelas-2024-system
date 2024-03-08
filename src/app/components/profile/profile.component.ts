import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/service/api.service';

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
    private message: MessageService,
    private api: ApiService,
    private router:Router
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
    } else if(this.password == this.password_old){
      this.message.add({
        severity:'warn',
        summary: 'PERHATIAN',
        detail:'Passowrd baru sama dnegan passowrd lama'
      })

    }
    else {
      const params = {
        USERNAME : this.account.USERNAME,
        PASSWORD : this.password_old,
        NEW_PASSWORD : this.password,
      }
   
      this.api.updatePassword(params).then((result : any)=>{
        this.message.add({
          severity:'success',
          summary: 'BERHASIL',
          detail:'Password berhasil diperbarui'
        });
        // setInterval(()=>{
        //   this.router.navigate(['auth/user/login']);
        // }, 2000)
      }).catch((error : any)=> {
        if (error.message == "Password salah") {
          this.message.add({
            severity:'warn',
            summary: 'PERHATIAN',
            detail:'Password lama salah'
          });
        } else {
          this.message.add({
            severity:'warn',
            summary: 'PERHATIAN',
            detail:'Kesalahan Server'
          });
        }
      })
    }
  }
}
