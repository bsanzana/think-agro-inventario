import { CommonModule } from "@angular/common";
import { Component, Input, SimpleChanges, inject, Output, EventEmitter } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import {
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  SharedModule,
} from "@coreui/angular";
import { User } from "src/app/interfaces/user";
import { UserService } from "src/app/services/user.service";
import { WarehousesService } from "src/app/services/warehouses.service";

import { NgxRutValidationModule, RutValidators } from "ngx-rut-validation";
@Component({
  selector: "app-form-edit",
  standalone: true,
  imports: [
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    FormModule,
    ReactiveFormsModule,
    GridModule,
    ListGroupModule,
    SharedModule,
    CommonModule,
    NgxRutValidationModule,
  ],
  templateUrl: "./form-edit.component.html",
  styleUrl: "./form-edit.component.scss",
})
export class FormEditComponent {
  @Input() userId!: string;
  @Output() closeModal = new EventEmitter<any>();
  /* 
  Tengo que crear este user vacio, porque el modal al crearse necesita el objeto,
   y si no esta vacio, esta undefined, da error.
   */
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

  warehouses: any;

  _userService = inject(UserService);
  _warehouseService = inject(WarehousesService);

  formEdit: FormGroup;
  constructor() {
    this.formEdit = new FormGroup({
      //RutValidators.default()
      rut: new FormControl("", [Validators.required, ]),
      //role: new FormControl(),
      // warehouses: new FormControl(),
      name: new FormControl("", Validators.required),
      //email: new FormControl(),
      //phone: new FormControl(),
      //password: new FormControl('',Validators.required),
    });
  }
  /* 
  El modal llega con el userId para cargar los datos undefined, 
  con OnChanges logro detectar cuando UsersComponent entrega el 
  userId de usuario que se clickeo el boton editar
   */

  ngOnChanges(changes: SimpleChanges) {
    this.loadUser();
  }

  async loadUser():Promise<void> {
    if (this.userId != undefined) {
      const response = await this._userService.getByIdUsers(this.userId);
      this.user = response.user;

      // Esto es por el momemento hasta tener arreglada la password
      const newUser:any = {}
      newUser['name'] = this.user.name;
      newUser['rut'] = this.user.rut;
      

      this.formEdit.setValue(newUser);
    }
  }

  async onSubmit():Promise<void> {
    const response = await this._userService.editUser(this.userId, this.formEdit.value);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formEdit.controls;
  }

  closeModalComponent():void {
    this.closeModal.emit(true);
  }
}
