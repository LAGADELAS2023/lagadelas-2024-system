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

  public soalPupuk(pages, pin) {
    return new Promise((resolve, reject) => {
      return this.http.post(`${environment.url_local}question?page=${pages}`, pin).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err)
      })
    })
  }

  public getSoalSandi(pages, pin) {
    return new Promise((resolve, reject) => {
      return this.http.post(`${environment.url_local}soal-sandi?page=${pages}`, pin).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err)
      })
    })
  }

  public soalSandi(params) {
    return new Promise((resolve, reject) => {
      return this.http.post(`${environment.url_local}create-sandi`, params).subscribe({
        next: (ress) => resolve(ress),
        error: (err) => reject(err)
      })
    })
  }

  public login(params) {
    return new Promise((resolve, reject) => {
      return this.http.post(`${environment.url_local}auth`, params).subscribe({
        next: (ress) => resolve(ress),
        error: (err) => reject(err)
      })
    })
  }


  public createPinSession(params) {
    return new Promise((resolve, reject) => {
      return this.http.post(`${environment.url_local}ins-session`, params).subscribe({
        next: (ress) => resolve(ress),
        error: (err) => reject(err)
      })
    })
  }

  public sessionGet() {
    return new Promise((resolve, reject) => {
      return this.http.get(`${environment.url_local}session`).subscribe({
        next: (ress) => resolve(ress),
        error: (err) => reject(err)
      })
    })
  }

  public createSoalPupuk(params) {
    return new Promise((resolve, reject) => {
      return this.http.post(`${environment.url_local}ins-puk`, params).subscribe({
        next: (ress) => resolve(ress),
        error: (err) => reject(err)
      })
    })
  }

  public updateSession(params) {
    return new Promise((resolve, reject) => {
      return this.http.post(`${environment.url_local}update-session`, params).subscribe({
        next: (ress) => resolve(ress),
        error: (err) => reject(err)
      })
    })
  }

  public saveResponse(params) {
    return new Promise((resolve, reject) => {
      return this.http.post(`${environment.url_local}submit`, params).subscribe({
        next: (ress) => resolve(ress),
        error: (err) => reject(err)
      })
    })
  }

  public getTotalSkor(params) {
    return new Promise((resolve, reject) => {
      return this.http.post(`${environment.url_local}summary`, params).subscribe({
        next: (ress) => resolve(ress),
        error: (err) => reject(err)
      })
    })
  }

  public getTotalSkorSandi(params) {
    return new Promise((resolve, reject) => {
      return this.http.post(`${environment.url_local}jawaban-sandi`, params).subscribe({
        next: (ress) => resolve(ress),
        error: (err) => reject(err)
      })
    })
  }

  public skorSandi(params) {
    return new Promise((resolve, reject) => {
      return this.http.post(`${environment.url_local}nilai-sandi`, params).subscribe({
        next: (ress) => resolve(ress),
        error: (err) => reject(err)
      })
    })
  }
}
