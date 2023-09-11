import { trigger, transition } from "@angular/animations";
import {fadeAnimation} from "./fade.animation";

export const routeAnimations =
  trigger("routeAnimations", [
    //transition('home => login', homeToLogin),
    //transition('login => home', slideUpAnimation),
    transition("* <=> *", fadeAnimation)
  ]);
