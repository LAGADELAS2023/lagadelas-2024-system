import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    protected http: HttpClient,
  ) { }

  public authLogin(params) {
    return new Promise((resolve, reject) => {
      return this.http.post(`${environment.url_public}auth-panitia`, params).subscribe({
        next: (ress) => resolve(ress),
        error: (err) => reject(err)
      })
    })
  }

  public soalPupuk(pages, pin) {
    return new Promise((resolve, reject) => {
      return this.http.post(`${environment.url_public}question?page=${pages}`, pin).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err)
      })
    })
  }

  public getSoalSandi(pages, pin) {
    return new Promise((resolve, reject) => {
      return this.http.post(`${environment.url_public}question?page=${pages}`, pin).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err)
      })
    })
  }

  public soalSandi(params) {
    return new Promise((resolve, reject) => {
      return this.http.post(`${environment.url_public}create-sandi`, params).subscribe({
        next: (ress) => resolve(ress),
        error: (err) => reject(err)
      })
    })
  }

  public login(params) {
    return new Promise((resolve, reject) => {
      return this.http.post(`${environment.url_public}auth`, params).subscribe({
        next: (ress) => resolve(ress),
        error: (err) => reject(err)
      })
    })
  }

  public updateAccount(params) {
    return new Promise((resolve, reject) => {
      return this.http.post(`${environment.url_public}update-account`, params).subscribe({
        next: (ress) => resolve(ress),
        error: (err) => reject(err)
      })
    })
  }


  public createPinSession(params) {
    return new Promise((resolve, reject) => {
      return this.http.post(`${environment.url_public}ins-session`, params).subscribe({
        next: (ress) => resolve(ress),
        error: (err) => reject(err)
      })
    })
  }

  public sessionGet() {
    return new Promise((resolve, reject) => {
      return this.http.get(`${environment.url_public}session`).subscribe({
        next: (ress) => resolve(ress),
        error: (err) => reject(err)
      })
    })
  }

  public createSoalPupuk(params) {
    return new Promise((resolve, reject) => {
      return this.http.post(`${environment.url_public}ins-puk`, params).subscribe({
        next: (ress) => resolve(ress),
        error: (err) => reject(err)
      })
    })
  }

  public updateSession(params) {
    return new Promise((resolve, reject) => {
      return this.http.post(`${environment.url_public}update-session`, params).subscribe({
        next: (ress) => resolve(ress),
        error: (err) => reject(err)
      })
    })
  }

  public saveResponse(params) {
    return new Promise((resolve, reject) => {
      return this.http.post(`${environment.url_public}submit`, params).subscribe({
        next: (ress) => resolve(ress),
        error: (err) => reject(err)
      })
    })
  }

  public getTotalSkor(params) {
    return new Promise((resolve, reject) => {
      return this.http.post(`${environment.url_public}summary-pupuk`, params).subscribe({
        next: (ress) => resolve(ress),
        error: (err) => reject(err)
      })
    })
  }

  public getTotalSumarrySandi(params) {
    return new Promise((resolve, reject) => {
      return this.http.post(`${environment.url_public}summary-sandi`, params).subscribe({
        next: (ress) => resolve(ress),
        error: (err) => reject(err)
      })
    })
  }

  public getTotalSumarrySemboyan(params) {
    return new Promise((resolve, reject) => {
      return this.http.post(`${environment.url_public}summary-semboyan`, params).subscribe({
        next: (ress) => resolve(ress),
        error: (err) => reject(err)
      })
    })
  }

  public getTotalSkorSandi(params) {
    return new Promise((resolve, reject) => {
      return this.http.post(`${environment.url_public}jawaban-sandi`, params).subscribe({
        next: (ress) => resolve(ress),
        error: (err) => reject(err)
      })
    })
  }

  public postJawabanSemboyan(params) {
    return new Promise((resolve, reject) => {
      return this.http.post(`${environment.url_public}jawaban-semboyan`, params).subscribe({
        next: (ress) => resolve(ress),
        error: (err) => reject(err)
      })
    })
  }

  public skorSandi(params) {
    return new Promise((resolve, reject) => {
      return this.http.post(`${environment.url_public}nilai-sandi`, params).subscribe({
        next: (ress) => resolve(ress),
        error: (err) => reject(err)
      })
    })
  }

  public listRole() {
    return new Promise((resolve, reject) => {
      return this.http.get(`${environment.url_public}role-list`).subscribe({
        next: (ress) => resolve(ress),
        error: (err) => reject(err)
      })
    })
  }

  public adminList() {
    return new Promise((resolve, reject) => {
      return this.http.get(`${environment.url_public}admin-list`).subscribe({
        next: (ress) => resolve(ress),
        error: (err) => reject(err)
      })
    })
  }

  public registerAccount(params) {
    return new Promise((resolve, reject) => {
      return this.http.post(`${environment.url_public}insert-account`, params).subscribe({
        next: (ress) => resolve(ress),
        error: (err) => reject(err)
      })
    })
  }

  public updatePassword(params) {
    return new Promise((resolve, reject) => {
      return this.http.post(`${environment.url_public}update-password`, params).subscribe({
        next: (ress) => resolve(ress),
        error: (err) => reject(err)
      })
    })
  }

  public sendSemboyan(params) {
    return new Promise((resolve, reject) => {
      return this.http.post(`${environment.url_public}create-semboyan`, params).subscribe({
        next: (ress) => resolve(ress),
        error: (err) => reject(err)
      })
    })
  }

  public soalSemboyan(params) {
    return new Promise((resolve, reject) => {
      return this.http.post(`${environment.url_public}question-semboyan`, params).subscribe({
        next: (ress) => resolve(ress),
        error: (err) => reject(err)
      })
    })
  }

  public pendaftaran(params) {
    return new Promise((resolve, reject) => {
      return this.http.post(`${environment.url_public}register-peserta`, params).subscribe({
        next: (ress) => resolve(ress),
        error: (err) => reject(err)
      })
    })
  }


  public infoLagadelas(params) {
    return new Promise((resolve, reject) => {
      return this.http.post(`${environment.url_public}info-lagadelas`, params).subscribe({
        next: (ress) => resolve(ress),
        error: (err) => reject(err)
      })
    })
  }




}
