import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmptyComponent } from './components/empty/empty.component';
import { AppMainComponent } from './app.main.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AccessComponent } from './components/access/access.component';
import { GeneratepupukComponent } from './components/generatepupuk/generatepupuk.component';
import { PupukComponent } from './components/pupuk/pupuk.component';
import { CreatePinSessionComponent } from './components/create-pin-session/create-pin-session.component';
import { AuthGuard } from './guard/auth.guard';
import { PendaftaranComponent } from './components/pendaftaran/pendaftaran.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                children: [
                    { path: '', component: DashboardComponent },
                    { path: 'materi/pupuk', component: GeneratepupukComponent },
                    { path: 'admin/pin-session', component: CreatePinSessionComponent },
                    { path: 'pages/empty', component: EmptyComponent },
                ],
            },
            { path: 'cat/pupuk/:pages', component: PupukComponent, canActivate: [AuthGuard], },
            { path: 'pendaftaran/peserta', component: PendaftaranComponent },
            { path: 'pages/landing', component: LandingComponent },
            { path: 'pages/login', component: LoginComponent },
            { path: 'pages/error', component: ErrorComponent },
            { path: 'pages/notfound', component: NotfoundComponent },
            { path: 'pages/access', component: AccessComponent },
            { path: '**', redirectTo: 'pages/login' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
