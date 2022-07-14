import { Routes } from "@angular/router";

import { DashboardComponent } from "./dashboard.component";
import { AdminGuard } from "../../../guards/admin.guard";

export const DashboardRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
        // canActivate: [AdminGuard],
      },
    ],
  },
];
