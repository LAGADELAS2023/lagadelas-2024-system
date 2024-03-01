import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';

@Component({
    selector: 'app-menu',
    template: `
        <div class="layout-menu-container">
            <ul class="layout-menu" role="menu" (keydown)="onKeydown($event)">
                <li app-menu class="layout-menuitem-category" *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true" role="none">
                    <div class="layout-menuitem-root-text" [attr.aria-label]="item.label">{{item.label}}</div>
                    <ul role="menu">
                        <li app-menuitem *ngFor="let child of item.items" [item]="child" [index]="i" role="none"></li>
                    </ul>
                </li>
            </ul>
        </div>
    `
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public appMain: AppMainComponent) { }

    ngOnInit() {
        this.model = [
            {
                label: 'ADMIN & REKAP',
                items: [
                    { label: 'REKAP NILAI', routerLink: ['/'] },
                    { label: 'VERIFIKASI REGU', routerLink: ['admin/verifikasi'] },
                    { label: 'BUAT PIN SESI', routerLink: ['/admin/pin-session'] },
                ]
            },
            {
                label: 'MATERI',
                items: [
                    { label: 'BUAT SOAL PUPUK', routerLink: ['materi/pupuk'] },
                    { label: 'BUAT SOAL SANDI', routerLink: ['materi/sandi'] },
                    { label: 'BUAT SOAL SEMBOYAN', routerLink: ['pages/empty'] },
                ]
            },
            {
                label: 'TOOLS',
                items: [
                    { label: 'BLOG', routerLink: ['tools/blog'] },
                ]
            },
        ];
    }

    onKeydown(event: KeyboardEvent) {
        const nodeElement = (<HTMLDivElement>event.target);
        if (event.code === 'Enter' || event.code === 'Space') {
            nodeElement.click();
            event.preventDefault();
        }
    }
}
