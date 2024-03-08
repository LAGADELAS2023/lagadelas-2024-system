import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../api/appconfig';
import { Subscription, interval } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
    :host ::ng-deep .p-password input {
    width: 100%;
    padding:1rem;
    }

    :host ::ng-deep .pi-eye{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }

    :host ::ng-deep .pi-eye-slash{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }
  `]
})
export class LoginComponent implements OnInit, OnDestroy {

  password: string;

  username: string;

  pin1: number;
  pin2: number;
  pin3: number;
  pin4: number;

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

  onDigitInput(event) {

    let element;

    if (event.code === 'Tab') {
      return;
    }

    if (event.code !== 'Backspace') {
      element = event.target.nextElementSibling;
    } else {
      element = event.target.previousElementSibling;
    }

    if (element) {
      element.focus();
    }
  }




  _login(a, b, c, d, e, f) {
    let pin = `${c}${d}${e}${f}`
    const params = {
      USERNAME: a,
      PASSWORD: b,
      PIN: pin
    }

    this.apiService.login(params).then(
      (result: any) => {
        if (result.status == 200) {
          this.messages = [{ severity: 'success', summary: 'Success', detail: 'Berhasil Login' }];
          localStorage.setItem('account', JSON.stringify(result.login))
          localStorage.setItem('isLoggedIn', "true");
          localStorage.setItem('pin', `${pin}`);
          interval(1000)
            .pipe(take(1))
            .subscribe(() => {
              if (result.data.SESSION_NAME == 'PUPUK-SANDI') {
                this.router.navigate(['cat/pupuk/0']);
              } else {
                this.router.navigate(['cat/semboyan']);
              }
            });
        }
      }).catch(
        (error: any) => {
          if (error.status == 404) {
            this.messages = [{ severity: 'error', summary: 'Failed', detail: 'Pin tidak ditemukan' }];
          } else {
            this.messages = [{ severity: 'error', summary: 'Failed', detail: 'Username atau password salah' }];
          }
        })
  }
}
