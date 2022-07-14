// tslint:disable: no-console
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
// import { AppService } from "../services/app.service";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private router: Router) // private appService: AppService
  {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean {
    // const isAdmin = this.appService.getIsAdmin();
    // const user = this.appService.getUser();
    console.log("admin guard");
    // if (!(isAdmin || user.isAdmin)) {
    //   this.router.navigate(["/pages"]);
    // }
    // return isAdmin || user.isAdmin;
    return true;
  }
}
