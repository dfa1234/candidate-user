import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersTableRoutingModule } from './users-table-routing.module';
import { UsersTableComponent } from './pages/users-table.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [UsersTableComponent],
  imports: [
    CommonModule,
    UsersTableRoutingModule,
    FormsModule
  ]
})
export class UsersTableModule { }
