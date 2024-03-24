import { HttpClientModule } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import {
  CardModule,
  GridModule,
  TableModule,
  PaginationModule
} from '@coreui/angular';

import {UserService} from '../../services/user.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule,HttpClientModule,PaginationModule, TableModule,CardModule,GridModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {


  users = signal<any[]>([]);
  currentPage = 1;
  totalPages = 0;
  arrayTotalPages = <any[]>([]);
  limit = 10;

  _userService = inject(UserService);


  ngOnInit(){
    this.loadUsers();
  }

  async loadUsers(){
    const response = await this._userService.getAllUser(this.currentPage, this.limit);
    this.users.set(response.users);
    this.totalPages = response.totalPages;
    this.arrayTotalPages = [...Array(response.totalPages).keys()]
  }

  previousPage()  {
    if(this.currentPage > 1){
      this.currentPage--;
      this.loadUsers();
    }
  }

  nextPage(){
    if(this.currentPage < this.totalPages){
      this.currentPage++;
      this.loadUsers();
    }
  }
}
