import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ConfigService } from 'src/app/service/app.config.service';
import { ApiService } from 'src/app/service/api.service';
import { AppConfig } from 'src/app/api/appconfig';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent implements OnInit, OnDestroy {

  password: string = "";
  username: string = "";
  config: AppConfig;
  subscription: Subscription;
  blockedDocument = false;

  constructor(
    public configService: ConfigService,
    protected apiService: ApiService,
    private router: Router,
    private message: MessageService,
    protected api:ApiService,
  ) { }

  ngOnInit(): void {
    localStorage.setItem('isLoggedIn', "false");
    localStorage.setItem('token', "");
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
    });
    localStorage.removeItem('account');
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  _login(a: string, b: string): void {
    if (a == "" || b == "") {
      this.message.clear();
      this.message.add({
        severity: 'error',
        summary: 'GAGAL',
        detail: 'Data wajib diisi'
      });
    } else {
      this.blockedDocument = true;
      const params = {
        USERNAME: a,
        PASSWORD: b,
      };
      setTimeout(()=>{
        this.api.authLogin(params).then((result: any) => {
          this.message.clear();
          this.message.add({
            severity: 'success',
            summary: 'BERHASIL',
            detail: 'berhasil login'
          });
          localStorage.setItem('isLoggedIn', "true");
          localStorage.setItem('token', result.token);
            this.router.navigate(['admin']);
        }).catch((error : any)=> {
          this.message.add({
            severity: 'error',
            summary: 'GAGAL',
            detail: 'username atau password salah'
          });
          this.blockedDocument = true;
        })
      }, 2000);
      
    }
  }
}
