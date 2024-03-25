import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  baseURL: string = environment.apiURL;
  http = inject(HttpClient);
  constructor() {}

  getAllUser(page: number, limit: number) {
    const params = {page: page.toString(), limit:limit.toString()}
    return firstValueFrom(this.http.get<any>(this.baseURL+'/api/users', {params}));
  }

  getByIdUsers(userId:string) {
    return firstValueFrom(this.http.get<any>(this.baseURL + "/api/users/"+userId));
  }

}
