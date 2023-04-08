import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {GamesComponent} from "./games.component";
import {RouterModule, Routes} from "@angular/router";
import {GamecardModule} from "../../../components/admin/cards/gamecard/gamecard.module";
import {ModalModule} from "../../../components/admin/modal/modal.module";
import {TextInputModule} from "../../../components/admin/inputs/text-input/text-input.module";
import {ButtonsModule} from "../../../components/buttons/buttons.module";
import {ListsModule} from "../../../components/admin/lists/lists.module";
import {EditGameModule} from "../../../components/admin/edit-game/edit-game.module";
import {PlaceComponent} from "../place/place.component";
import {EditPlaceModule} from "../../../components/admin/edit-place/edit-place.module";

const routes: Routes = [
  {path: "", component: GamesComponent},
  {path: "place/:gameId/:placeId", component: PlaceComponent}
];

@NgModule({
  declarations: [
    GamesComponent,
    PlaceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GamecardModule,
    ModalModule,
    TextInputModule,
    ButtonsModule,
    ListsModule,
    EditGameModule,
    EditPlaceModule
  ],
  exports: [GamesComponent]
})
export class GamesModule {
}
