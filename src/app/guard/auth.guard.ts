import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    const isLogged = localStorage.getItem('isLoggedIn') == "true";
    const token = localStorage.getItem('token') != "";

    if (isLogged && token) {
      return true;
    } else {
      return this.router.createUrlTree(['auth/user/login']);
    }
  }
}
