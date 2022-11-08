import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {RouterModule, Routes} from "@angular/router";
import {TextInputModule} from "../../components/inputs/text-input/text-input.module";
import {ButtonsModule} from "../../components/buttons/buttons.module";

const routes: Routes = [
  {path: '', component: LoginComponent},
]


@NgModule({
  declarations: [
    LoginComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TextInputModule,
        ButtonsModule,
    ],
  exports: [LoginComponent]
})
export class LoginModule { }
