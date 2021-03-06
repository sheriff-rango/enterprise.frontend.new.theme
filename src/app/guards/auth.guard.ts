import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { AppService } from "../services/app.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private appService: AppService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isLogged = this.appService.isLogged();
    if (!isLogged) this.router.navigate(["auth/login"]);
    return isLogged;

    // return this.authService.isAuthenticatedOrRefresh().pipe(
    //   tap((authenticated) => {
    //     console.log("authenticated2", authenticated);
    //     if (!authenticated) {
    //       this.router.navigate(["auth/login"]);
    //     }
    //   })
    // );
  }
}
