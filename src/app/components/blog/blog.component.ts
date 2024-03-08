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


  convertToHtml(text: string): string {
    return `<div>${text}</div>`;
  }


}
