import { Component } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {

  text = "";

  constructor(){

  }

  cek(){
    console.log(this.text);
    
  }

  convertToHtml(text: string): string {
    return `<div>${text}</div>`;
  }


}
