import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';

@Component({
    selector: 'app-menu',
    template: `
        <div class="layout-menu-container">
            <ul class="layout-menu" role="menu" (keydown)="onKeydown($event)">
                <li app-menu class="layout-menuitem-category" *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true" role="none">
                    <div class="layout-menuitem-root-text" [attr.aria-label]="item.label" *ngIf="item.akses">{{item.label}}</div>
                    <ul role="menu"  *ngIf="item.akses">
                        <li app-menuitem *ngFor="let child of item.items" [item]="child" [index]="i" role="none"></li>
                    </ul>
                </li>
            </ul>
        </div>
    `
})
export class AppMenuComponent implements OnInit {

    model: any[];
    account: any;

    constructor(public appMain: AppMainComponent) {
    }

    ngOnInit() {
        this.account = JSON.parse(localStorage.getItem('account'));
        this.model = [
            {
                label: 'HOME',
                items: [
                    { label: 'DASHBOARD', routerLink: ['/admin'] },
                ],
                role: [],
            },
            {
                label: 'ADMINISTRASI',
                items: [
                    { label: 'VERIFIKASI REGU', routerLink: ['verifikasi'] },
                    { label: 'BUAT AKUN REGU', routerLink: ['sekretaris/buat-akun-peserta'] },
                ],
                role: ["REGULER", "ADMIN", "SEKRETARIS"],
            },
            {
                label: 'MATERI',
                items: [
                    { label: 'BUAT PIN SESI', routerLink: ['pin-session'] },
                    { label: 'APROVAL SOAL', routerLink: ['materi/aproval'] },
                    { label: 'BUAT SOAL PUPUK', routerLink: ['materi/pupuk'] },
                    { label: 'BUAT SOAL SANDI', routerLink: ['materi/sandi'] },
                    { label: 'BUAT SOAL SEMBOYAN', routerLink: ['materi/semboyan'] },
                ],
                role: ["MATERI", "ADMIN", "REGULER"],
            },
            // {
            //     label: 'TOOLS',
            //     items: [
            //         { label: 'BLOG', routerLink: ['tools/blog'] },
            //     ],
            //     role: [],
            // },
            {
                label: 'ADMIN ZONE',
                items: [
                    { label: 'BUAT AKUN', routerLink: ['register/account'] },
                ],
                role: ["ADMIN"],
            },
        ];
        for (let i = 0; i < this.model.length; i++) {
            if (this.model[i].role.length == 0 || this.model[i].role.includes(this.account.DIVISI)) {
                this.model[i]['akses'] = true;
            } else {
                this.model[i]['akses'] = false;
            }
        }

    }

    onKeydown(event: KeyboardEvent) {
        const nodeElement = (<HTMLDivElement>event.target);
        if (event.code === 'Enter' || event.code === 'Space') {
            nodeElement.click();
            event.preventDefault();
        }
    }
}
