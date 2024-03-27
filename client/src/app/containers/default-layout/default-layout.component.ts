import { Component, inject } from "@angular/core";

import { navItems } from "./_nav";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./default-layout.component.html",
  styleUrls: ["./default-layout.component.scss"],
})
export class DefaultLayoutComponent {
  public navItems = navItems;
  router = inject(Router);
  constructor() {}

  ngOnInit() {
    if (!localStorage.getItem("warehouseSelect")) {
      this.router.navigate(["/warehouses"]);
    }
  }
}
