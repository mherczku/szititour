import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditGameComponent } from './edit-game.component';
import {TextInputModule} from "../inputs/text-input/text-input.module";
import {ButtonsModule} from "../buttons/buttons.module";
import {FormsModule} from "@angular/forms";
import {DateInputModule} from "../inputs/date-input/date-input.module";



@NgModule({
  declarations: [
    EditGameComponent
  ],
  exports: [
    EditGameComponent
  ],
  imports: [
    CommonModule,
    TextInputModule,
    ButtonsModule,
    FormsModule,
    DateInputModule
  ]
})
export class EditGameModule { }
