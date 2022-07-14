import { Component, OnInit } from "@angular/core";
import { AppService } from "../../services/app.service";

export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  rtlTitle: string;
  collapse?: string;
  isCollapsed?: boolean;
  isCollapsing?: any;
  children?: ChildrenItems[];
}

export interface ChildrenItems {
  path: string;
  title: string;
  smallTitle?: string;
  rtlTitle: string;
  rtlSmallTitle?: string;
  type?: string;
  collapse?: string;
  children?: ChildrenItems2[];
  isCollapsed?: boolean;
}
export interface ChildrenItems2 {
  path?: string;
  smallTitle?: string;
  rtlSmallTitle?: string;
  title?: string;
  rtlTitle: string;
  type?: string;
}
//Menu Items
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "tim-icons icon-chart-pie-36",
    rtlTitle: "لوحة القيادة",
  },
];

const AdminMenu: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "tim-icons icon-chart-pie-36",
    rtlTitle: "لوحة القيادة",
  },
];

const NormalMenu: RouteInfo[] = [
  {
    path: "/home",
    title: "Home",
    type: "link",
    icontype: "tim-icons icon-laptop",
    rtlTitle: "لوحة القيادة",
  },
];

const WhiteListMenu: RouteInfo[] = [
  {
    path: "/white-list-mint",
    title: "White List Mint",
    type: "link",
    icontype: "tim-icons icon-badge",
    rtlTitle: "لوحة القيادة",
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private appService: AppService) {}

  ngOnInit() {
    // this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.initMenu();
  }

  initMenu() {
    const menu: RouteInfo[] = [];
    menu.push(...NormalMenu);
    const user = this.appService.getUser();
    if (this.appService.getIsAdmin() || user?.isAdmin) menu.push(...AdminMenu);
    if (user?.isWhiteListed) menu.push(...WhiteListMenu);
    this.menuItems = menu;
  }
}
