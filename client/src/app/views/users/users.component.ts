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
import { CommonModule } from "@angular/common";
import { User } from "../../interfaces/user";
import { FormControl, FormGroup } from "@angular/forms";

import {FormEditComponent} from "./forms/form-edit/form-edit.component"
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
    ListGroupModule,FormEditComponent
  ],
  templateUrl: "./users.component.html",
  styleUrl: "./users.component.scss",
})
export class UsersComponent {
  users = signal<any[]>([]);
  userId!:string;
  //El modal se me bugea cuando no tiene user asociado valores, al llamarse siempre se llenara con valores reales
  user: User = {
    _id: "",
    role: "",
    warehouses: [],
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
    __v: 0,
  };
  currentPage = 1;
  totalPages = 0;
  limit = 10;


  _userService = inject(UserService);

  
  ngOnInit() {
    this.loadUsers();
  }

  async loadUsers() {
    const response = await this._userService.getAllUser(
      this.currentPage,
      this.limit
    );
    this.users.set(response.users);
    this.totalPages = response.totalPages;
  }

  async seeUser(userId: string) {
    const response = await this._userService.getByIdUsers(userId);
    this.user = response.user;
  }

  editUser(userId: string){
    this.userId = userId;
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
