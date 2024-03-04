import { Component, OnDestroy } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items: MenuItem[];

    constructor(
        public appMain: AppMainComponent,
        private confirmationService: ConfirmationService, 
        private messageService: MessageService,
        private router:Router,
    ) { }

        confirm() {
            this.confirmationService.confirm({
                header: 'Apakah anda yakin ingin keluar?',
                message: 'Please confirm to proceed.',
                accept: () => {
                    this.router.navigate(['**'])
                },
            });
        }
}
