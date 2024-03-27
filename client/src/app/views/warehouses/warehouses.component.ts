import { Component, inject } from '@angular/core';
import {WarehousesService} from '../../services/warehouses.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-warehouses',
  standalone: true,
  imports: [],
  templateUrl: './warehouses.component.html',
  styleUrl: './warehouses.component.scss'
})
export class WarehousesComponent {
  _warehousesService = inject(WarehousesService);
  router = inject(Router);
  warehouses:any;

  ngOnInit(){
    this.loadWarehouses();
  }

  async loadWarehouses():Promise<void>{
    const response = await this._warehousesService.getAllWarehouses(0, 0, localStorage.getItem('token'));
    this.warehouses = response.warehouses;
    console.log(response);
  }

  selectWarehouse(idWarehouse:any){
    this._warehousesService.setWarehouseToUse(idWarehouse);
    this.router.navigate(['/dashboard']);
  }
}
