import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

interface ParamType {
  title?: string;
  string?: string;
  html?: string;
  option?: any;
  position?: {
    from?: "top" | "bottom";
    align?: "right" | "center" | "left";
  };
}

@Injectable()
export class NotificationService {
  constructor(public toastr: ToastrService) {}

  pushSuccessMsg(params: ParamType) {
    const { title, string, html, option, position } = params;
    if (!string && !html) return;
    this.toastr.success(
      string
        ? `<span class=" tim-icons icon-bell-55"></span> ${string}`
        : html || "",
      title || "",
      {
        timeOut: 8000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-success alert-with-icon",
        ...{ option },
        positionClass: `toast-${position?.from || "top"}-${
          position?.align || "right"
        }`,
      }
    );
  }

  pushInfoMsg(params: ParamType) {
    const { title, string, html, option, position } = params;
    if (!string && !html) return;
    this.toastr.info(
      string
        ? `<span class=" tim-icons icon-bell-55"></span> ${string}`
        : html || "",
      title || "",
      {
        timeOut: 8000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-info alert-with-icon",
        ...{ option },
        positionClass: `toast-${position?.from || "top"}-${
          position?.align || "right"
        }`,
      }
    );
  }

  pushErrorMsg(params: ParamType) {
    const { title, string, html, option, position } = params;
    if (!string && !html) return;
    this.toastr.error(
      string
        ? `<span class=" tim-icons icon-bell-55"></span> ${string}`
        : html || "",
      title || "",
      {
        timeOut: 8000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-danger alert-with-icon",
        positionClass: `toast-${position?.from || "top"}-${
          position?.align || "right"
        }`,
      }
    );
  }

  pushWarningMsg(params: ParamType) {
    const { title, string, html, option, position } = params;
    if (!string && !html) return;
    this.toastr.warning(
      string
        ? `<span class=" tim-icons icon-bell-55"></span> ${string}`
        : html || "",
      title || "",
      {
        timeOut: 8000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-warning alert-with-icon",
        ...{ option },
        positionClass: `toast-${position?.from || "top"}-${
          position?.align || "right"
        }`,
      }
    );
  }

  pushNormalMsg(params: ParamType) {
    const { title, string, html, option, position } = params;
    if (!string && !html) return;
    this.toastr.show(
      string
        ? `<span class=" tim-icons icon-bell-55"></span> ${string}`
        : html || "",
      title || "",
      {
        timeOut: 8000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-primary alert-with-icon",
        ...{ option },
        positionClass: `toast-${position?.from || "top"}-${
          position?.align || "right"
        }`,
      }
    );
  }
}
