import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }


  decodeToken(token:any) {
    return jwtDecode(token);
  }
}
