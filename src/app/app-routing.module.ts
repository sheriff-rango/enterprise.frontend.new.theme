import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
// import { RtlLayoutComponent } from "./layouts/rtl-layout/rtl-layout.component";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "",
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./pages/examples/dashboard/dashboard.module").then(
            (x) => x.DashboardModule
          ),
      },
      {
        path: "home",
        loadChildren: () =>
          import("./pages/examples/home/home.module").then((x) => x.HomeModule),
      },
    ],
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "auth",
        loadChildren: () =>
          import("./pages/examples/pages/pages.module").then(
            (x) => x.PagesModule
          ),
      },
    ],
  },
  // {
  //   path: "",
  //   component: RtlLayoutComponent,
  //   children: [
  //     {
  //       path: "pages",
  //       loadChildren: () =>
  //         import("./pages/examples/pages/rtl/rtl.module").then(
  //           (x) => x.RtlModule
  //         ),
  //     },
  //   ],
  // },
  {
    path: "**",
    redirectTo: "home",
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: "enabled",
      anchorScrolling: "enabled",
      scrollOffset: [0, 64],
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
