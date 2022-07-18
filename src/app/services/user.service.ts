import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URL } from "../../environments/config";
import { AppService } from "src/app/services/app.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient, private appService: AppService) {}

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + "all", { responseType: "text" });
  }

  getUserBoard(address: string, hash: string): Observable<any> {
    return this.http.get(
      API_URL +
        "user?address=" +
        encodeURIComponent(address) +
        "&&hash=" +
        encodeURIComponent(hash),
      {
        responseType: "text",
      }
    );
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + "mod", { responseType: "text" });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + "get-user", {
      responseType: "text",
      headers: new HttpHeaders({
        account: this.appService.getUser().hash,
      }),
    });
  }

  getToken(amount, hash): Observable<any> {
    return this.http.post(
      API_URL + "get-token",
      {
        hash,
        amount,
      },
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          account: this.appService.getUser().hash,
        }),
      }
    );
  }
}
