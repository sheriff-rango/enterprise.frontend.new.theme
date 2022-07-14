import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { AppService } from "src/app/services/app.service";
import { AccountInfo } from "src/app/types/account";
import { contractAddress } from "src/environments/config";
import { KeplrService } from "../../../../services/keplr.service";
import { UserService } from "../../../../services/user.service";

export const validateAccountInfo = (accountInfo: AccountInfo): boolean => {
  if (!accountInfo) return false;
  return Boolean(accountInfo.address && accountInfo.hash && accountInfo.name);
};

@Component({
  selector: "app-login",
  styleUrls: ["./login.component.scss"],
  templateUrl: "login.component.html",
})
export class LoginComponent implements OnInit, OnDestroy {
  focus;
  focus1;
  isAdmin = false;
  username?: string;
  account: any;

  constructor(
    protected router: Router,
    private appService: AppService,
    private userService: UserService,
    private keplrService: KeplrService
  ) {}

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("login-page");
    const isLogged = this.appService.isLogged();
    if (isLogged) this.router.navigate(["/pages"]);
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("login-page");
  }

  async connectKeplr(accountInfo?: AccountInfo): Promise<AccountInfo> {
    let storeObject: AccountInfo;
    if (validateAccountInfo(accountInfo)) {
      storeObject = accountInfo;
      this.username = storeObject.name;
      this.account = storeObject.address;
    } else {
      const account = await this.keplrService.getAccount();
      this.username = account.info.name;
      this.account = account.address;

      storeObject = {
        address: this.account,
        hash: account.hash,
        name: this.username,
      };
    }

    const queryResult = await this.keplrService.runQuery(contractAddress, {
      get_state_info: {},
    });
    this.appService.setMintInfo({
      ...queryResult,
      count: Number(queryResult.count),
      max_nft: Number(queryResult.max_nft),
      price: Number(queryResult.price),
      total_nft: Number(queryResult.total_nft),
    });

    return storeObject;
  }

  async connectWallet(accountInfo?: AccountInfo): Promise<void> {
    const storeObject = await this.connectKeplr(accountInfo);

    this.userService
      .getUserBoard(storeObject.address, storeObject.hash)
      .subscribe({
        next: (data) => {
          const result = JSON.parse(data);
          const users = result?.users;
          if (!users || users.length == 0) {
            window.localStorage.setItem(
              "account-info",
              JSON.stringify(storeObject)
            );
            this.router.navigate(["/auth/register"]);
          } else {
            const user = users[0];
            this.appService.setUser(user, storeObject);
            const isAdmin = this.appService.getIsAdmin();
            if (!isAdmin && !!user.isWhiteListed) {
              this.router.navigate(["/auth/whitelist"]);
            } else {
              this.appService.setLogged(true);
              this.router.navigate(["/home"]);
            }
          }
        },
        error: (err) => {},
      });
  }

  disconnectWallet() {
    this.username = "";
    this.account = "";
    this.isAdmin = false;
    window.localStorage.clear();
  }
}
