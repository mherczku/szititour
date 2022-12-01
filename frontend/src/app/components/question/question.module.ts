import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question.component';
import {ButtonsModule} from "../buttons/buttons.module";



@NgModule({
    declarations: [
        QuestionComponent
    ],
    exports: [
        QuestionComponent
    ],
  imports: [
    CommonModule,
    ButtonsModule
  ]
})
export class QuestionModule { }
