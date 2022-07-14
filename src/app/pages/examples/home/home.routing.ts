import { Routes } from "@angular/router";

import { HomeComponent } from "./home.component";
import { AdminGuard } from "../../../guards/admin.guard";

export const DashboardRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: HomeComponent,
      },
    ],
  },
];
