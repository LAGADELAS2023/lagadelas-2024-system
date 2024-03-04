import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from 'src/app/service/app.config.service'; 
import { AppConfig } from 'src/app/api/appconfig';
import { Subscription, interval } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';



@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.scss'
})
export class LoginUserComponent implements OnInit, OnDestroy {

  password: string;

  username: string;

  config: AppConfig;

  subscription: Subscription;

  messages: any[] | undefined;

  constructor(
    public configService: ConfigService,
    protected apiService: ApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    localStorage.setItem('isLoggedIn', "false")
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
    });
    localStorage.removeItem('account')
  }


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  _login(a, b) {
    const params = {
      USERNAME: a,
      PASSWORD: b,
    }

    this.router.navigate(['admin']);
    // this.apiService.login(params).then(
    //   (result: any) => {
    //     if (result.status == 200) {
    //       this.messages = [{ severity: 'success', summary: 'Success', detail: 'Berhasil Login' }];
    //       localStorage.setItem('account', JSON.stringify(result.login))
    //       localStorage.setItem('isLoggedIn', "true");
    //       interval(1000)
    //         .pipe(take(1))
    //         .subscribe(() => {
    //           if (result.data.SESSION_NAME == 'PUPUK') {
    //             this.router.navigate(['cat/pupuk/1']);
    //           } else {
    //             this.router.navigate(['cat/sandi/1']);
    //           }
    //         });
    //     }
    //   }).catch(
    //     (error: any) => {
    //       if (error.status == 404) {
    //         this.messages = [{ severity: 'error', summary: 'Failed', detail: 'Pin tidak ditemukan' }];
    //       } else {
    //         this.messages = [{ severity: 'error', summary: 'Failed', detail: 'Username atau password salah' }];
    //       }
    //     })
  }

}
