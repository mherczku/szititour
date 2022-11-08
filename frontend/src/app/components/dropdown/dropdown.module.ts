import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown.component';
import {ButtonsModule} from "../buttons/buttons.module";
import {RouterModule} from "@angular/router";



@NgModule({
    declarations: [
        DropdownComponent
    ],
    exports: [
        DropdownComponent
    ],
  imports: [
    CommonModule,
    ButtonsModule,
    RouterModule
  ]
})
export class DropdownModule { }
