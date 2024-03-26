import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseURL: string = environment.apiURL;
  http = inject(HttpClient);
  constructor() { }


  login(formValue:any){
    return firstValueFrom(this.http.post<any>(this.baseURL + "/api/login/", formValue));
  }

}
