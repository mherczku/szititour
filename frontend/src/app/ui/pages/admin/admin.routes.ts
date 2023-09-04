import { Routes } from "@angular/router";
import { ActiveGameComponent } from "./active-game/active-game.component";
import { GamesComponent } from "./games/games.component";
import { PlaceComponent } from "./place/place.component";
import { CONST_ROUTES } from "src/app/constants/routes.constants";


export const ADMIN_ROUTES: Routes = [
  {
    path: CONST_ROUTES.admin.home.path,
    component: GamesComponent
  },

  {
    path: CONST_ROUTES.admin.active.path,
    component: ActiveGameComponent
  },

  {
    path: CONST_ROUTES.admin.place.path,
    component: PlaceComponent
  },


  { path: "**", redirectTo: CONST_ROUTES.admin.home.path },
];

