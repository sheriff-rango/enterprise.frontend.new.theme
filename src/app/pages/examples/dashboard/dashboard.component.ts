import { Component, OnInit, OnDestroy } from "@angular/core";
import Chart from "chart.js";
import { UserService } from "../../../services/user.service";
import { AppService } from "../../../services/app.service";
import { AuthService } from "../../../services/auth.service";
import { KeplrService } from "../../../services/keplr.service";
import { contractAddress } from "../../../../environments/config";
import { NotificationService } from "../../../services/notification.service";

@Component({
  selector: "app-dashboard",
  styleUrls: ["./dashboard.component.scss"],
  templateUrl: "dashboard.component.html",
})
export class DashboardComponent implements OnInit, OnDestroy {
  private alive = true;
  source: any;
  isAdmin: boolean;
  myHash: string;
  isLoadingData: boolean = false;
  isPendingTx: { [key: string]: boolean } = {};
  constructor(
    private userService: UserService,
    private appService: AppService,
    private authService: AuthService,
    private keplrService: KeplrService,
    private notificationService: NotificationService
  ) {
    this.isAdmin = this.appService.getIsAdmin();
    this.myHash = this.appService.getUser().hash;
    this.loadData();
  }

  ngOnInit() {
    setInterval(() => {
      this.loadData(true);
    }, 1000);
  }

  loadData(preventRefresh = false) {
    if (!preventRefresh) {
      this.isLoadingData = true;
    }
    const account = this.appService.getUser();
    this.userService.getAdminBoard().subscribe({
      next: (data) => {
        const parsed = JSON.parse(data);
        let result = [];
        // queries = [];
        parsed.data.forEach((user) => {
          if (account.address !== user.address) {
            if (this.isAdmin || !user.isAdmin) {
              result.push({
                ...user,
                balanceString: `${user.balance.toFixed(2)}JUNO`,
                sendId: `send-${user.hash}`,
                getId: `get-${user.hash}`,
              });
              // queries.push(
              //   this.keplrService.getBalance(user.custom_wallet_address)
              // );
            }
          }
        });
        this.isLoadingData = false;
        this.source = result;
      },
      error: (err) => {},
    });
  }

  addRemoveToWhiteLists(user, isWhiteListed) {
    this.authService.setWhiteList(user.hash, isWhiteListed).subscribe({
      next: (data) => {
        this.loadData();
      },
      error: (err) => {},
    });
  }

  async setRemoveAdmin(user, isAdmin) {
    await this.keplrService.runExecute(contractAddress, {
      [isAdmin === "true" ? "add_admin" : "delete_admin"]: {
        ...(isAdmin === "true"
          ? {
              admin: {
                address: user.custom_wallet_address,
                name: "",
                email: "",
              },
            }
          : { admin: user.custom_wallet_address }),
      },
    });
    this.authService.setAdmin(user.hash, isAdmin).subscribe({
      next: (data) => {
        this.notificationService.pushSuccessMsg({
          title: "Set Admin.",
          string: `${user.firstName} ${user.lastName} has been ${
            isAdmin === "true" ? "set as an Admin" : "removed from Admin"
          } successfully!`,
        });
        this.loadData();
      },
      error: (err) => {},
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  async sendToken(user) {
    const inputElement: any = document.getElementById(`send-${user.hash}`);
    const amount = Number(inputElement.value);
    if (!isNaN(amount) && amount) {
      try {
        await this.keplrService.sendToken(amount, user.custom_wallet_address);
        inputElement.value = "";
        this.notificationService.pushSuccessMsg({
          title: "Send Token",
          string: `The amount ${amount} has been sent successfully!`,
        });
        this.loadData();
      } catch (err) {
        console.error("send token error", err);
      }
    }
  }

  async getToken(user) {
    const inputElement: any = document.getElementById(`get-${user.hash}`);
    const amount = Number(inputElement.value);
    if (amount > user.balance) {
      this.notificationService.pushErrorMsg({
        title: "Get Token",
        string: `Insufficient funds. Amount is greater than balance(${user.balance})`,
      });
      return;
    }
    if (!isNaN(amount) && amount) {
      this.userService.getToken(amount, user.hash).subscribe({
        next: (data) => {
          inputElement.value = "";
          this.notificationService.pushSuccessMsg({
            title: "Get Token",
            string: `The amount ${amount} has been received successfully!`,
          });
          this.loadData();
        },
        error: (err) => {
          this.notificationService.pushErrorMsg({
            title: "Get Token",
            string: err.error,
          });
        },
      });
    }
  }
}
