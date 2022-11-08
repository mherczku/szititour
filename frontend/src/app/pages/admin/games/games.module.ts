import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesComponent } from './games.component';
import {RouterModule, Routes} from "@angular/router";
import {GamecardModule} from "../../../components/cards/gamecard/gamecard.module";
import {ModalModule} from "../../../components/modal/modal.module";
import {TextInputModule} from "../../../components/inputs/text-input/text-input.module";
import {ButtonsModule} from "../../../components/buttons/buttons.module";
import {ListsModule} from "../../../components/lists/lists.module";
import {EditGameModule} from "../../../components/edit-game/edit-game.module";

const routes: Routes = [
  {path: '', component: GamesComponent},
]

@NgModule({
  declarations: [
    GamesComponent
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
    ],
  exports: [GamesComponent]
})
export class GamesModule { }
