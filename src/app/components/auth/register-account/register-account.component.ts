import { Component, OnInit} from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrl: './register-account.component.scss',
})
export class RegisterAccountComponent implements OnInit {

  username : string;
  password !: string;
  full_name : string;
  selectedDivisi : any;
  email : string;
  selectedRole: any;
  accountList : any;
  selectedAccount : any;

  mstDivisi = [
    {id : 0, name: "REGULER"},
    {id : 1, name: "SEKRETARIS"},
    {id : 2, name: "BENDAHARA"},
    {id : 4, name: "DDD"},
    {id : 5, name: "MATERI"},
    {id : 6, name: "ACARA"},
    {id : 7, name: "HUMAS"},
    {id : 8, name: "PERLENGKAPAN"},
    {id : 9, name: "DANUS"},
    {id : 10, name: "ADMIN"},
  ];
  mstRole = [];

  constructor(
    protected api:ApiService,
    private message: MessageService,
  ){}

  ngOnInit() {
      this._initApi()
  }

  _initApi(){
    this.api.listRole().then(
      (result : any)=>{
        this.mstRole = result.data;
      })

    this.api.adminList().then((result : any)=>{
      this.accountList = result.data;
      })
  }

  _register(){
    const params = {
      'USERNAME' : this.username.toUpperCase(),
      'PASSWORD' : this.password ,
      'FULL_NAME' : this.full_name.toUpperCase() ,
      'DIVISI' : this.selectedDivisi.name ,
      'EMAIL' : this.email.toUpperCase() ,
      'ACCESS_ROLE' : this.selectedRole.ID_ROLE ,
      'CREATED_AT' : new Date()
    }

    this.api.registerAccount(params).then(
      (result : any)=> {
        this.message.add({
          severity:'success',
          summary : 'BERHASIL',
          detail : 'membuat account'
        });
        this.ngOnInit();
      }).catch((error : any)=>{
        this.message.add({
          severity:'error',
          summary : 'GAGAL',
          detail  : 'membuat account'
        })
      })
  }
  
}
