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

  public soalPupuk(pages) {
    return new Promise((resolve, reject) => {
      return this.http.get(`${environment.url_local}soal-opsi?page=${pages}`).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err)
      })
    })
  }
}
