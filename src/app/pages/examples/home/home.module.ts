import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
// import { ChartsModule } from "ng2-charts";
import { ComponentsModule } from "../../../components/components.module";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { DashboardRoutes } from "./home.routing";

import { HomeComponent } from "./home.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    BsDropdownModule.forRoot(),
    ComponentsModule,
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class HomeModule {}
