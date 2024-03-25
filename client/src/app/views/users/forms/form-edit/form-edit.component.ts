import { Component, Input, SimpleChanges, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  SharedModule
} from '@coreui/angular';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-form-edit',
  standalone: true,
  imports: [ButtonGroupModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    FormModule,
    GridModule,
    ListGroupModule,
    SharedModule],
  templateUrl: './form-edit.component.html',
  styleUrl: './form-edit.component.scss'
})
export class FormEditComponent {

  @Input() userId!: string;
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
  _userService = inject(UserService);

  formEdit:FormGroup;

  constructor(){
    this.formEdit = new FormGroup({
      rut: new FormControl(),
      role:new FormControl(),
      warehouses: new FormControl(),
      name: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      password: new FormControl(),
    })
  }
  // tengo mis dudas al respecto
  ngOnChanges(changes: SimpleChanges) {   
    this.loadUser();
    console.log('cambio');
}

  async loadUser(){
    if(this.userId != undefined){
      const response = await this._userService.getByIdUsers(this.userId);
      this.user = response.user;
    }
  }
}
