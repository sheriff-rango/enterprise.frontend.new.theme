import { Component, OnInit, OnDestroy } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../../../../services/auth.service";
import { AppService } from "../../../../services/app.service";
import { UserService } from "../../../../services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  styleUrls: ["./whitelist-login-register.component.scss"],
  templateUrl: "whitelist-login-register.component.html",
})
export class WhitelistLoginRegisterComponent implements OnInit, OnDestroy {
  focus_password;
  focus_confirm_password;
  focus_email;
  focus_entityId;
  formData: any = {};
  user: any = {};
  constructor(
    public toastr: ToastrService,
    private authService: AuthService,
    private appService: AppService,
    private userService: UserService,
    protected router: Router
  ) {}

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("register-page");

    const user = this.appService.getUser();
    if (!user) {
      this.router.navigate(["/auth/login"]);
    }
    console.log("user", user);
    this.user = user;
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("register-page");
  }

  onChangeFormData(key, e) {
    const { value } = e.target;
    this.formData[key] = value;
  }

  showErrorMessage(message) {
    this.toastr.show(
      '<span data-notify="icon" class="tim-icons icon-bell-55"></span>',
      message,
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-danger alert-with-icon",
        positionClass: "toast-top-right",
      }
    );
  }

  register() {
    const { password, passwordConfirm } = this.formData;
    if (!password) {
      this.showErrorMessage("Please input password!");
      return;
    }
    if (!passwordConfirm) {
      this.showErrorMessage("Please confirm password!");
      return;
    }
    if (password !== passwordConfirm) {
      this.showErrorMessage("Password not matched!");
      return;
    }
    this.authService.registerWhitelist(this.user.hash, password).subscribe({
      next: (data) => {
        console.log("success", data);
        this.appService.setLogged(true);
        this.router.navigate(["/home"]);
      },
      error: (err) => {
        console.log("fail", err);
      },
    });
  }

  login() {
    const { password } = this.formData;
    if (!password) {
      this.showErrorMessage("Please input password");
      return;
    }
    this.authService.loginWhitelist(this.user.hash, password).subscribe({
      next: (data) => {
        this.appService.setLogged(true);
        this.router.navigate(["/home"]);
      },
      error: (err) => {
        console.log("fail", err);
      },
    });
  }
}
