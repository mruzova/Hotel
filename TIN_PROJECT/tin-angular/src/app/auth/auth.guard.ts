import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { TokenService } from '../token.service';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(public tokenService: TokenService, public router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.tokenService.hasToken) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}