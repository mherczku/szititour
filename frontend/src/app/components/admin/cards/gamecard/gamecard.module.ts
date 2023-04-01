import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {GamecardComponent} from "./gamecard.component";
import {ButtonsModule} from "../../../buttons/buttons.module";
import {ImgSrcModule} from "../../../../pipes/img-src/img-src.module";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    GamecardComponent,
  ],
  exports: [
    GamecardComponent,
  ],
    imports: [
        CommonModule,
        ButtonsModule,
        ImgSrcModule,
        FormsModule
    ]
})
export class GamecardModule {
}
