import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {QuestionEditComponent} from "./question-edit.component";
import {TextInputModule} from "../inputs/text-input/text-input.module";
import {ButtonsModule} from "../buttons/buttons.module";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    QuestionEditComponent
  ],
  exports: [
    QuestionEditComponent
  ],
  imports: [
    CommonModule,
    TextInputModule,
    ButtonsModule,
    FormsModule
  ]
})
export class QuestionEditModule {
}
