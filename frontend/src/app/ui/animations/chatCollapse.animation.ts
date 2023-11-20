import {
  trigger,
  transition,
  style,
  animate,
  state
} from "@angular/animations";

export const chatCollapse = trigger("chatCollapse", [
  state(
    "true",
    style({
      padding: 0,
      width: "0",
      height: 0,
      overflow: "hidden"
    })
  ),

  state("false", style({ height: "*" })),

  transition("1 => 0", animate("200ms")),

  transition("0 => 1", animate("200ms")),
]);
