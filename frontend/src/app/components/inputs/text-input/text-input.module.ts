import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './text-input.component';
import {FormsModule} from "@angular/forms";
import {ButtonsModule} from "../../buttons/buttons.module";



@NgModule({
    declarations: [
        TextInputComponent
    ],
    exports: [
        TextInputComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ButtonsModule
    ]
})
export class TextInputModule { }
