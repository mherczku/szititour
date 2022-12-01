import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditPlaceComponent} from './edit-place.component';
import {TextInputModule} from "../inputs/text-input/text-input.module";
import {ButtonsModule} from "../buttons/buttons.module";
import {QuestionModule} from "../question/question.module";
import {ModalModule} from "../modal/modal.module";
import {QuestionEditModule} from "../question-edit/question-edit.module";


@NgModule({
  declarations: [
    EditPlaceComponent
  ],
  exports: [
    EditPlaceComponent
  ],
  imports: [
    CommonModule,
    TextInputModule,
    ButtonsModule,
    QuestionModule,
    ModalModule,
    QuestionEditModule
  ]
})
export class EditPlaceModule {
}
