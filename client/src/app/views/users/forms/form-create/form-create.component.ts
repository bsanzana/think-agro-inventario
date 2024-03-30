import { CommonModule } from "@angular/common";
import {
  Component,
  Input,
  SimpleChanges,
  inject,
  Output,
  EventEmitter,
} from "@angular/core";
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
  TableModule,
  ModalModule,
} from "@coreui/angular";
import { ToasterModule, ToasterService } from "angular-toaster";

import { User } from "src/app/interfaces/user";
import { TokenService } from "src/app/services/token.service";
import { UserService } from "src/app/services/user.service";
import { WarehousesService } from "src/app/services/warehouses.service";
@Component({
  selector: "app-form-create",
  standalone: true,
  imports: [
    TableModule,
    ModalModule,
    CommonModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    FormModule,
    GridModule,
    ListGroupModule,
    SharedModule,
    ReactiveFormsModule,ToasterModule
  ],
  templateUrl: "./form-create.component.html",
  styleUrl: "./form-create.component.scss",
})
export class FormCreateComponent {
  @Output() closeModal = new EventEmitter<any>();

  formCreate: FormGroup;
  userService = inject(UserService);
  tokenService = inject(TokenService);
  toasterService = inject(ToasterService);
  constructor() {
    this.formCreate = new FormGroup({
      rut: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }

  async onSubmit() {
    const payload = this.tokenService.decodeToken();
    this.formCreate.value["company"] = payload.company;
    const response = await this.userService.create(this.formCreate.value);

    if(!response.error){
      this.toasterService.pop("success", "Usuario creado con exito!");
      this.closeModal.emit(true);

    }else{
      this.toasterService.pop("error", "Usuario no creado", response.error);
    }
  }
  get f(): { [key: string]: AbstractControl } {
    return this.formCreate.controls;
  }

}
