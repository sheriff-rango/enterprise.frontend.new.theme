import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URL } from "../../environments/config";
import { AppService } from "src/app/services/app.service";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient, private appService: AppService) {}

  register(
    firstName: string,
    lastName: string,
    email: string,
    entityID: string,
    address: string,
    hash: string
  ): Observable<any> {
    // if (!firstName || !lastName || !entityID || !email || !address || !hash)
    //   return;
    return this.http.post(
      API_URL + "register",
      {
        firstName,
        lastName,
        email,
        entityID,
        address,
        hash,
      },
      httpOptions
    );
  }
  registerWhitelist(hash: string, password: string): Observable<any> {
    // if (!password || !hash) return;
    return this.http.post(
      API_URL + "set-password",
      { password, hash },
      httpOptions
    );
  }

  loginWhitelist(hash: string, password: string): Observable<any> {
    // if (!password || !hash) return;
    return this.http.post(
      API_URL + "whitelist-login",
      { password, hash },
      httpOptions
    );
  }

  setWhiteList(hash: string, isWhiteListed: string): Observable<any> {
    // if (!isWhiteListed || !hash || !accountHash) return;
    return this.http.post(
      API_URL + "set-whitelist",
      { isWhiteListed, hash },
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          account: this.appService.getUser().hash,
        }),
      }
    );
  }

  setAdmin(hash: string, isAdmin: string): Observable<any> {
    // if (!hash || !accountHash || !isAdmin) return;
    return this.http.post(
      API_URL + "set-admin",
      { hash, isAdmin },
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          account: this.appService.getUser().hash,
        }),
      }
    );
  }
}
