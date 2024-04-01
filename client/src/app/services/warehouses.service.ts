import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WarehousesService {

  constructor() { }

  baseURL: string = environment.apiURL;
  http = inject(HttpClient);

  getAllWarehouses(page: number, limit: number, token:any) {
    const params = {page: page.toString(), limit:limit.toString(), token:token}
    return firstValueFrom(this.http.get<any>(this.baseURL+'/api/warehouses', {params}));
  }

  getByIdWarehouses(warehousesId:any) {
    return firstValueFrom(this.http.get<any>(this.baseURL + '/api/warehouses/'+warehousesId));
  }

  getWarehousesByIduser(userId:string) {
    return firstValueFrom(this.http.get<any>(this.baseURL + '/api/warehouses/managers/'+userId));
  }

  createWarehouse(formValues:any) {
    return firstValueFrom(this.http.post<any>(this.baseURL + '/api/warehouses/create', formValues));
  }

  editWarehouse(warehouseId:string, formValues:any) {
    return firstValueFrom(this.http.put<any>(this.baseURL + "/api/warehouse/"+warehouseId, formValues));
  }
  setWarehouseToUse(warehouse: any){
    console.log(warehouse);
    localStorage.setItem('warehouseSelect', warehouse);
  }
}

