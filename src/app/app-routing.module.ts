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
import { GeneratesandiComponent } from './components/generatesandi/generatesandi.component';
import { SandiComponent } from './components/sandi/sandi.component';
import { VerifikasiReguComponent } from './components/verifikasi-regu/verifikasi-regu.component';
import { BlogComponent } from './components/blog/blog.component';
import { SemboyanComponent } from './components/semboyan/semboyan.component';
import { GeneratesemboyanComponent } from './components/generatesemboyan/generatesemboyan.component';
import { LoginUserComponent } from './components/auth/login-user/login-user.component';
import { RegisterAccountComponent } from './components/auth/register-account/register-account.component';
import { AprovalSoalComponent } from './components/aproval-soal/aproval-soal.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'admin', component: AppMainComponent,
                children: [
                    { path: '', component: DashboardComponent },
                    { path: 'materi/aproval', component: AprovalSoalComponent },
                    { path: 'materi/pupuk', component: GeneratepupukComponent },
                    { path: 'materi/sandi', component: GeneratesandiComponent },
                    { path: 'materi/semboyan', component: GeneratesemboyanComponent },
                    { path: 'pin-session', component: CreatePinSessionComponent },
                    { path: 'verifikasi', component: VerifikasiReguComponent },
                    { path: 'tools/blog', component: BlogComponent },
                    { path: 'register/account', component: RegisterAccountComponent },
                    { path: 'pages/empty', component: EmptyComponent },
                    { path: 'user/profile', component: ProfileComponent },
                ],
                canActivate: [AuthGuard]
            },
            { path: 'cat/pupuk/:pages', component: PupukComponent, canActivate: [AuthGuard], },
            { path: 'cat/sandi/:pages', component: SandiComponent },
            { path: 'cat/semboyan/:pages', component: SemboyanComponent },
            { path: 'pendaftaran/peserta', component: PendaftaranComponent },
            { path: 'pages/landing', component: LandingComponent },
            { path: 'pages/login', component: LoginComponent },
            { path: 'auth/user/login', component: LoginUserComponent },
            { path: 'pages/error', component: ErrorComponent },
            { path: 'pages/notfound', component: NotfoundComponent },
            { path: 'pages/access', component: AccessComponent },
            { path: '**', redirectTo: 'auth/user/login' },
            {path : '', redirectTo: 'auth/user/login', pathMatch: 'full'}
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
