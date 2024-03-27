import { Component, Input, inject } from "@angular/core";
import { Router } from "@angular/router";

import { ClassToggleService, HeaderComponent } from "@coreui/angular";
import {WarehousesService} from "../../../services/warehouses.service";
@Component({
  selector: "app-default-header",
  templateUrl: "./default-header.component.html",
})
export class DefaultHeaderComponent extends HeaderComponent {
  @Input() sidebarId: string = "sidebar";
  router = inject(Router);
  warehouseService = inject(WarehousesService);
  warehouseSelect = '';
  //Carga el componente antes de que llegue la data del warehouse, tendre que crear una interface
  warehouseData:any;
  public newMessages = new Array(4);
  public newTasks = new Array(5);
  public newNotifications = new Array(5);

  constructor(private classToggler: ClassToggleService) {
    super();
  }

  async ngOnInit(){
    this.warehouseSelect = localStorage.getItem('warehouseSelect')!;
    this.warehouseData = await this.warehouseService.getByIdWarehouses(this.warehouseSelect);
  }
  logOut() {
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
}
