import {Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {ActiveGameComponent} from "./active-game/active-game.component";


export const USER_ROUTES: Routes = [
  {
    //matcher: getMatcher(["home", "fooldal"], 1),
    path: "home",
    component: HomeComponent
  },

  {
    path: "active/:id",
    component: ActiveGameComponent
  },



  {path: "**", redirectTo: ""},
];

/*
export function getMatcher(paths: string[], dept: number) {
  return function(url: UrlSegment[]) {
    if (url.length > dept) {
      const path = url[dept].path;
      console.log(path , url, paths, paths.includes(path))
      if(paths.includes(path)){
        return {consumed: url};
      }
    }
    return null;
  };
}
*/
