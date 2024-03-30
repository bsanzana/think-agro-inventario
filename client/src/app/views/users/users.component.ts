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

import { UserService } from "../../services/user.service";
import { TokenService } from "../../services/token.service";
import { CommonModule } from "@angular/common";
import { User } from "../../interfaces/user";
import { ToasterModule, ToasterService } from "angular-toaster";

import { FormEditComponent } from "./forms/form-edit/form-edit.component";
import { FormCreateComponent } from "./forms/form-create/form-create.component";

@Component({
  selector: "app-users",
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    PaginationModule,
    TableModule,
    CardModule,
    GridModule,
    ButtonModule,
    ModalModule,
    ListGroupModule,
    FormEditComponent,
    FormCreateComponent,
    ToasterModule,
  ],
  templateUrl: "./users.component.html",
  styleUrl: "./users.component.scss",
})
export class UsersComponent {
  users = signal<any[]>([]);
  userId!: string;
  //El modal se me bugea cuando no tiene user asociado valores, al llamarse siempre se llenara con valores reales
  user: User = {
    _id: "",
    role: "",
    warehouses: [],
    company: [],
    active: false,
    force_password_update: false,
    rut: "",
    name: "",
    email: "",
    phone: "",
    salt: "",
    hash: "",
    createdAt: "",
    updatedAt: "",
    password: "",
    __v: 0,
  };

  //Variables para la paginación
  currentPage = 1;
  totalPages = 0;
  limit = 10;

  //Servicios
  _userService = inject(UserService);
  _tokenService = inject(TokenService);
  toasterService = inject(ToasterService);
  ngOnInit() {
    this.loadUsers();
  }

  closeModal(id: string) {
    this.loadUsers();
    const boton = document.getElementById(id);
    boton!.click();
    this.loadUsers();
  }
  async loadUsers(): Promise<void> {
    const response = await this._userService.getAllUser(
      this.currentPage,
      this.limit,
      localStorage.getItem("token")
    );
    this.users.set(response.users);
    this.totalPages = response.totalPages;
  }

  async seeUser(userId: string): Promise<void> {
    const response = await this._userService.getByIdUsers(userId);
    this.user = response.user;
  }

  editUser(userId: string) {
    this.userId = userId;
  }

  async deleteUsuario() {
    const response = await this._userService.deleteUser(this.userId);
    if(!response.error){

      this.toasterService.pop("success", "Usuario elimnado con exito!");
    }else{

      this.toasterService.pop("error", "Usuario no fue elimnado", response.error);
    }
    this.loadUsers();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadUsers();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadUsers();
    }
  }
}
