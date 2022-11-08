import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditGameComponent } from './edit-game.component';
import {TextInputModule} from "../inputs/text-input/text-input.module";
import {ButtonsModule} from "../buttons/buttons.module";



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
    ButtonsModule
  ]
})
export class EditGameModule { }
