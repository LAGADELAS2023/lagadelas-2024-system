import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { MessageService } from 'primeng/api';
import { Account } from 'src/app/api/account';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrl: './register-account.component.scss',
})
export class RegisterAccountComponent implements OnInit {

  username: string;
  password !: string;
  full_name: string;
  selectedDivisi: any;
  email: string;
  selectedRole: any;
  accountList: any;
  selectedAccount: Account = {
    ID: 0,
    USERNAME: "",
    PASSWORD: "",
    FULL_NAME: "",
    DIVISI: "",
    EMAIL: "",
    ACCESS_ROLE: "",
    STATUS: "",
    CREATED_AT: "",
    MODIFIED_AT: "",
    ID_ROLE: "",
    ROLE_NAME: "",
  };
  visible = false;

  mstDivisi = [
    { id: 0, name: "REGULER" },
    { id: 1, name: "SEKRETARIS" },
    { id: 2, name: "BENDAHARA" },
    { id: 4, name: "DDD" },
    { id: 5, name: "MATERI" },
    { id: 6, name: "ACARA" },
    { id: 7, name: "HUMAS" },
    { id: 8, name: "PERLENGKAPAN" },
    { id: 9, name: "DANUS" },
    { id: 10, name: "ADMIN" },
  ];
  mstRole = [];

  constructor(
    protected api: ApiService,
    private message: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this._initApi()
  }

  _initApi() {
    this.api.listRole().then(
      (result: any) => {
        this.mstRole = result.data;
      })

    this.api.adminList().then((result: any) => {
      this.accountList = result.data;
      this.accountList.sort((a, b) => {
        const nameA = a.FULL_NAME.toUpperCase();
        const nameB = b.FULL_NAME.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    });

  }

  _register() {
    const params = {
      'USERNAME': this.username.toUpperCase(),
      'PASSWORD': this.password,
      'FULL_NAME': this.full_name.toUpperCase(),
      'DIVISI': this.selectedDivisi.name,
      'EMAIL': this.email.toUpperCase(),
      'ACCESS_ROLE': this.selectedRole.ID_ROLE,
      'CREATED_AT': new Date()
    }

    this.api.registerAccount(params).then(
      (result: any) => {
        this.message.add({
          severity: 'success',
          summary: 'BERHASIL',
          detail: 'membuat account'
        });
        this.ngOnInit();
      }).catch((error: any) => {
        this.message.add({
          severity: 'error',
          summary: 'GAGAL',
          detail: 'membuat account'
        })
      })
  }

  openDialogUpdate(account) {
    this.visible = true;
    this.selectedAccount = { ...account }
    this.selectedAccount.PASSWORD = ''
  }

  updateAccount() {
    const params = {
      'ID': this.selectedAccount.ID,
      'USERNAME': this.selectedAccount.USERNAME,
      'PASSWORD': this.selectedAccount.PASSWORD,
      'FULL_NAME': this.selectedAccount.FULL_NAME,
      'DIVISI': this.selectedAccount.DIVISI.name,
      'EMAIL': this.selectedAccount.EMAIL,
      'ACCESS_ROLE': this.selectedAccount.ROLE_NAME.ID_ROLE,
      'STATUS': this.selectedAccount.STATUS,
      'MODIFIED_AT': new Date()
    }

    this.api.updateAccount(params).then((result: any) => {
      this.visible = false;
      this.message.add({
        severity: 'success',
        summary: 'BERHASIL',
        detail: 'Memperbarui account, diarahkan ke halaman login'
      });
      setInterval(() => {
        this.router.navigate(['auth/user/login']);
      }, 2000)
    }).catch((error: any) => {
      this.message.add({
        severity: 'error',
        summary: 'GAGAL',
        detail: 'memperbarui account atau tidak ada perubahan'
      });
    })

  }

}
