import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-pendaftaran',
  templateUrl: './pendaftaran.component.html',
  styleUrl: './pendaftaran.component.scss'
})
export class PendaftaranComponent implements OnInit {

  nama_regu = "";
  nama_pangkalan = "";
  nama_pendamping = "";
  nama_kwaran = ""; 
  nomor_wa = "";
  kategori = [
    { id: 1, name: "LAKI-LAKI" },
    { id: 2, name: "PEREMPUAN" },
  ];
  selectedKategori: any;
  fotoAnggotaRegu : any = null;
  labelFotoanggotaRegu = "";
  suratTugasSekolah = null;
  labelTugasSekolah = ""
  suratTugasKwaran = null;
  labelTugasKwaran = ""


  
  constructor(
    private api:ApiService,
    private message:MessageService
    ) { }
    
    fotoAnggota(event: any, key): void {
      const reader = new FileReader();
  
      if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);
  
        reader.onload = () => {
          this.fotoAnggotaRegu = reader.result as string;
          this.labelFotoanggotaRegu = file.name;
        };
      }
    }

    uploadSuratTugasSekolah(event: any, key): void {
      const reader = new FileReader();
  
      if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);
  
        reader.onload = () => {
          this.suratTugasSekolah = reader.result as string;
          this.labelTugasSekolah = file.name;
        };
      }
    }

    uploadSuratTugasKwaran(event: any, key): void {
      const reader = new FileReader();
  
      if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);
  
        reader.onload = () => {
          this.suratTugasKwaran = reader.result as string;
          this.labelTugasKwaran = file.name;
        };
      }
    }

    
    ngOnInit(): void {

    }

    postPendaftaran(){
      const params = {
        'NAMA_REGU' : this.nama_regu,
        'NAMA_PANGKALAN' : this.nama_pangkalan,
        'CATEGORY' : this.selectedKategori.name,
        'SURAT_TUGAS_SEKOLAH' : this.suratTugasSekolah,
        'KWARRAN' : this.nama_kwaran,
        'SURAT_TUGAS_KWARRAN' : this.suratTugasKwaran,
        'NOMOR_WHATSAPP' : this.nomor_wa,
        'NAMA_PENDAMPING' : this.nama_pendamping,
        'FOTO_REGU' : this.fotoAnggotaRegu,
      }

      this.api.pendaftaran(params).then((result => {
        this.message.add({
          severity : "success",
          summary : "Berhasil",
          detail : "Pendaftaran Berhasil"
        })
      })).catch(error => {
        this.message.add({
          severity : "error",
          summary : "Gagal",
          detail : "Pendaftaran Gagal"
        })

      })
    }

}
