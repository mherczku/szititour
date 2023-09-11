import { trigger, transition, style, animate } from "@angular/animations";


export const popInOut = trigger("popInOut", [
  transition(":enter", [
    style({ transform: "scale(0)" }), animate("200ms ease-in-out", style({ transform: "scale(1)"}))]
  ),
  transition(":leave",
    [style({ transform: "scale(1)" }), animate("200ms ease-in-out", style({ transform: "scale(0)" }))]
  )
]);

