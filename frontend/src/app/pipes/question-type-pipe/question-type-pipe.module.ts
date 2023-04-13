import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {QuestionTypePipe} from "./question-type.pipe";


@NgModule({
  declarations: [
    QuestionTypePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    QuestionTypePipe
  ]
})
export class QuestionTypePipeModule {
}
