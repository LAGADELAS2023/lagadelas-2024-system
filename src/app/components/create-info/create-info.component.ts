import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-create-info',
  templateUrl: './create-info.component.html',
  styleUrls: ['./create-info.component.scss']
})
export class CreateInfoComponent {

  title: string;
  thumbnail: string;
  content: string;
  errorMessage: string = "";

  constructor(
    protected api: ApiService,
    private message: MessageService
  ) { }

  checkThumbnailLength(event: any) {
    const thumbnailLength = event.target.value.length;
    if (thumbnailLength < 200) {
      this.errorMessage = 'Karakter yang anda masukkan kurang dari 200';
    } else if (thumbnailLength > 300) {
      this.thumbnail = event.target.value.slice(0, 300);
      this.errorMessage = 'Karakter yang anda masukkan lebih dari 300';
    } else {
      this.errorMessage = '';
    }
  }

  publish() {
    let account = JSON.parse(localStorage.getItem('account'));
    let currentDate = new Date().toISOString().slice(0, 10);

    let params = {
      "METHOD": 1,
      "TITLE": this.title,
      "THUMBNAIL": this.thumbnail,
      "CONTENT": this.content,
      "CREATED_AT": currentDate,
      "CREATED_BY": account.FULL_NAME
    };

    this.api.infoLagadelas(params).then(
      (response: any) => {
        this.message.add({ severity: 'success', summary: 'Berhasil !', detail: 'Informasi berhasil dipublish' })
        this.title = '';
        this.thumbnail = '';
        this.content = '';
        this.errorMessage = '';
      },
      error => {
        console.error(error);
        this.errorMessage = 'Gagal mempublikasikan informasi. Silakan coba lagi.';
      }
    );
  }
}
