import { Routes } from "@angular/router";

import { RegisterComponent } from "./register/register.component";
import { PricingComponent } from "./pricing/pricing.component";
import { LockComponent } from "./lock/lock.component";
import { LoginComponent } from "./login/login.component";
import { WhitelistLoginRegisterComponent } from "./whitelist-login-register/whitelist-login-register.component";

export const PagesRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "login",
        component: LoginComponent,
      },
      {
        path: "lock",
        component: LockComponent,
      },
      {
        path: "register",
        component: RegisterComponent,
      },
      {
        path: "whitelist",
        component: WhitelistLoginRegisterComponent,
      },
      {
        path: "pricing",
        component: PricingComponent,
      },
    ],
  },
];
