import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ConfigService } from 'src/app/service/app.config.service';
import { ApiService } from 'src/app/service/api.service';
import { AppConfig } from 'src/app/api/appconfig';
import {FormBuilder, FormControl, FormGroup, FormArray, Validators} from '@angular/forms';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent implements OnInit, OnDestroy {

  password: boolean;
  username: boolean;
  config: AppConfig;
  subscription: Subscription;
  blockedDocument = false;
  formGroup: FormGroup;


  constructor(
    public configService: ConfigService,
    protected apiService: ApiService,
    private router: Router,
    private message: MessageService,
    protected api:ApiService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    localStorage.setItem('isLoggedIn', "false");
    localStorage.setItem('token', "");
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
    });
    localStorage.removeItem('account');
    this.formGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  conditionCheckUsername(){
    if (this.formGroup.value.username != '') {
      this.username = false
    } else{
      this.username = true
    }
  }

  conditionCheckPassword(){
    if (this.formGroup.value.password != '') {
      this.password = false
    } else {
      this.password = true
    }
  }

  _login(): void {
    if (!this.formGroup.valid) {
      if (this.formGroup.value.username == '') {
        this.username = true
      } 
      if(this.formGroup.value.password == '') {
        this.password = true
        
      }
    } else {
      this.blockedDocument = true;
      const params = {
        USERNAME: this.formGroup.value.username,
        PASSWORD: this.formGroup.value.password,
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
          localStorage.setItem('account', JSON.stringify(result.data));
            this.router.navigate(['admin']);
        }).catch((error : any)=> {
          this.message.add({
            severity: 'error',
            summary: 'GAGAL',
            detail: 'username atau password salah'
          });
          this.blockedDocument = false;
        })
      }, 2000);
      
    }
  }
}
