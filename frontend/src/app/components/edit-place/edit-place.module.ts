import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPlaceComponent } from './edit-place.component';
import {TextInputModule} from "../inputs/text-input/text-input.module";



@NgModule({
  declarations: [
    EditPlaceComponent
  ],
  exports: [
    EditPlaceComponent
  ],
    imports: [
        CommonModule,
        TextInputModule
    ]
})
export class EditPlaceModule { }
