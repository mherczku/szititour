import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import {RouterModule, Routes} from "@angular/router";
import {TextInputModule} from "../../components/inputs/text-input/text-input.module";
import {ButtonsModule} from "../../components/buttons/buttons.module";

const routes: Routes = [
  {path: '', component: RegisterComponent},
]

@NgModule({
  declarations: [
    RegisterComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TextInputModule,
        ButtonsModule,
    ],
  exports: [RegisterComponent]
})
export class RegisterModule { }
