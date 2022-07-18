import { Component, OnInit, OnDestroy } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { AuthService } from "../../../../services/auth.service";
import { AppService } from "../../../../services/app.service";
import { UserService } from "../../../../services/user.service";
import { NotificationService } from "../../../../services/notification.service";

@Component({
  selector: "app-register",
  styleUrls: ["./register.component.scss"],
  templateUrl: "register.component.html",
})
export class RegisterComponent implements OnInit, OnDestroy {
  focus_first;
  focus_last;
  focus_email;
  focus_entityId;
  formData: any = {};
  constructor(
    public toastr: ToastrService,
    private authService: AuthService,
    private appService: AppService,
    private userService: UserService,
    private NotificationService: NotificationService,
    protected router: Router
  ) {}

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("register-page");
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("register-page");
  }

  onChangeFormData(key, e) {
    const { value } = e.target;
    this.formData[key] = value;
  }

  register() {
    if (!this.formData.firstName) {
      this.NotificationService.pushErrorMsg({
        title: "Form Validation Error.",
        string: "Please input First Name!",
      });
      return;
    }
    if (!this.formData.lastName) {
      this.NotificationService.pushErrorMsg({
        title: "Form Validation Error.",
        string: "Please input Last Name!",
      });
      return;
    }
    if (!this.formData.email) {
      this.NotificationService.pushErrorMsg({
        title: "Form Validation Error.",
        string: "Please input Email!",
      });
      return;
    }
    if (!this.formData.entityId) {
      this.NotificationService.pushErrorMsg({
        title: "Form Validation Error.",
        string: "Please input EntityId!",
      });
      return;
    }
    const { firstName, lastName, email, entityId } = this.formData;
    const storedObjectString = window.localStorage.getItem("account-info");
    const storedObject = storedObjectString
      ? JSON.parse(storedObjectString)
      : null;

    if (!storedObject.address || !storedObject.hash)
      this.router.navigate(["auth/login"]);
    this.authService
      .register(
        firstName,
        lastName,
        email,
        entityId,
        storedObject.address,
        storedObject.hash
      )
      .subscribe({
        next: (data) => {
          const storedObject = JSON.parse(
            window.localStorage.getItem("account-info")
          );
          this.userService
            .getUserBoard(storedObject.address, storedObject.hash)
            .subscribe({
              next: (data) => {
                const result = JSON.parse(data);
                const users = result?.users;
                if (!users || users.length == 0) {
                  window.localStorage.setItem(
                    "account-info",
                    JSON.stringify(storedObject)
                  );
                  this.router.navigate(["/auth/register"]);
                } else {
                  const user = users[0];
                  this.appService.setUser(user, storedObject);
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
          this.appService.setLogged(true);
          this.router.navigate(["/home"]);
        },
        error: (err) => {
          console.log("fail", err);
        },
      });
  }
}
