import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GamecardComponent} from './gamecard.component';
import {ButtonsModule} from "../../buttons/buttons.module";


@NgModule({
  declarations: [
    GamecardComponent,
  ],
  exports: [
    GamecardComponent,
  ],
  imports: [
    CommonModule,
    ButtonsModule
  ]
})
export class GamecardModule {
}
