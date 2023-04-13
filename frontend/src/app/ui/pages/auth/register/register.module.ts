import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RegisterComponent} from "./register.component";
import {RouterModule, Routes} from "@angular/router";
import {TextInputModule} from "../../../components/admin/inputs/text-input/text-input.module";
import {ButtonsModule} from "../../../components/buttons/buttons.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {path: "", component: RegisterComponent},
];

@NgModule({
  declarations: [
    RegisterComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TextInputModule,
        ButtonsModule,
        FormsModule,
        ReactiveFormsModule
    ],
  exports: [RegisterComponent]
})
export class RegisterModule {
}
