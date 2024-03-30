import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }


  decodeToken() {
    const token = localStorage.getItem("token");
    const tokenDecode =jwtDecode(token!);
    return JSON.parse(JSON.stringify(tokenDecode));
  }
}
