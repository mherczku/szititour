import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {GamecardComponent} from "./gamecard.component";
import {ButtonsModule} from "../../../buttons/buttons.module";
import {ImgSrcModule} from "../../../../../pipes/img-src/img-src.module";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";


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
        FormsModule,
        RouterLink
    ]
})
export class GamecardModule {
}
