import { HttpClientModule } from "@angular/common/http";
import { Component, inject, signal } from "@angular/core";
import {
  CardModule,
  GridModule,
  TableModule,
  PaginationModule,
  ButtonModule,
  ModalModule,
  ListGroupModule,
} from "@coreui/angular";
import { Warehouse } from "../../../interfaces/warehouse";
import { WarehousesService } from "../../../services/warehouses.service";
import { UserService } from "../../../services/user.service";

import { TokenService } from "../../../services/token.service";
import { ToasterModule, ToasterService } from "angular-toaster";
@Component({
  selector: "app-crud-warehouses",
  standalone: true,
  imports: [
    CardModule,
    GridModule,
    TableModule,
    PaginationModule,
    ButtonModule,
    ModalModule,
    ListGroupModule,
  ],
  templateUrl: "./crud-warehouses.component.html",
  styleUrl: "./crud-warehouses.component.scss",
})
export class CrudWarehousesComponent {
  //Variables
  warehouses: any;
  warehouse = {
    _id: "",
    name: "",
    company: "",
    products: [],
    createdAt: "",
    updatedAt: "",
    managers: [],
    __v: 0,
  };
  managers!:string[];
  currentPage = 1;
  totalPages = 0;
  limit = 10;
  //Servicios
  warehousesService = inject(WarehousesService);
  tokenService = inject(TokenService);
  userService = inject(UserService);

  ngOnInit() {
    this.loadWarehouses();
  }

  async loadWarehouses() {
    const response = await this.warehousesService.getAllWarehouses(
      this.currentPage,
      this.limit,
      this.tokenService.getToken()
    );

    if (!response.error) {
      console.log(response.warehouses);

      this.warehouses = response.warehouses;
    } else {
      console.log(response.error);
    }
  }

  async seeWarehouse(warehouseId: string): Promise<void> {
    const response = await this.warehousesService.getByIdWarehouses(
      warehouseId
    );
    if (!response.error) {
      console.log(response.warehouse);

      this.warehouse = response.warehouse;
      const managers = [];
      for (let item in this.warehouse.managers) {
        const managerId = this.warehouse.managers[item];
        const response = await this.userService.getByIdUsers(managerId);
        
        managers.push(response.user.name.toString());
        console.log(managers);
      }
      this.managers = managers;
    } else {
      console.log(response.error);
    }
  }
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadWarehouses();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadWarehouses();
    }
  }
}
