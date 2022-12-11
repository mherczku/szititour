import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question.component';
import {ButtonsModule} from "../buttons/buttons.module";
import {ImgSrcModule} from "../../pipes/img-src/img-src.module";
import {QuestionTypePipeModule} from "../../pipes/question-type-pipe/question-type-pipe.module";



@NgModule({
    declarations: [
        QuestionComponent
    ],
    exports: [
        QuestionComponent
    ],
    imports: [
        CommonModule,
        ButtonsModule,
        ImgSrcModule,
        QuestionTypePipeModule
    ]
})
export class QuestionModule { }
