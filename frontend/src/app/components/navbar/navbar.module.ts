import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import {ButtonsModule} from "../buttons/buttons.module";
import {RouterModule} from "@angular/router";



@NgModule({
    declarations: [
        NavbarComponent
    ],
    exports: [
        NavbarComponent
    ],
    imports: [
        CommonModule,
        ButtonsModule,
        RouterModule
    ]
})
export class NavbarModule { }
