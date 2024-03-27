import { Component, inject } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { LoginService } from "../../../services/login.service";
import { ToasterModule, ToasterService } from "angular-toaster";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  submitted = false;
  _loginService = inject(LoginService);
  _toasterService = inject(ToasterService);
  router = inject(Router);
  formLogin: FormGroup;
  constructor() {
    this.formLogin = new FormGroup({
      rut: new FormControl("", [Validators.required]),
      password: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {
    if (localStorage.getItem("token")) {
      this.router.navigate(["/dashboard"]);
    }
  }
  async onSubmit(): Promise<void> {
    this.submitted = true;
    const response = await this._loginService.login(this.formLogin.value);
    if (!response.error) {
      this._toasterService.pop("success", "Acceso aceptado!");
      localStorage.setItem("token", response.token);
      this.router.navigate(["/warehouses"]);
    } else {
      this._toasterService.pop(
        "error",
        "Acceso denegado!",
        "Credenciales incorrectas"
      );
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formLogin.controls;
  }
}
