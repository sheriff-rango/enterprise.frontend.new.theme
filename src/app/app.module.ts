import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { RtlLayoutComponent } from "./layouts/rtl-layout/rtl-layout.component";
import { AppService } from "./services/app.service";
import { AuthGuard } from "./guards/auth.guard";

const GUARDS = [AuthGuard];

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    RtlLayoutComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    ComponentsModule,
    HttpClientModule,
  ],
  providers: [AppService, ...GUARDS],
  bootstrap: [AppComponent],
})
export class AppModule {}
