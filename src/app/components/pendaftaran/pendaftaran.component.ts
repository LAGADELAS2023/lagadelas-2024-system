import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pendaftaran',
  templateUrl: './pendaftaran.component.html',
  styleUrl: './pendaftaran.component.scss'
})
export class PendaftaranComponent implements OnInit {

  kategori = [
    { id: 1, name: "LAKI-LAKI" },
    { id: 2, name: "PEREMPUAN" },
  ];
  selectedKategori: any

  constructor(

  ) { }

  ngOnInit(): void {

  }

}
