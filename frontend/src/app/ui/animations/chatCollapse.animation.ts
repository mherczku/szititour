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

  /* transition("0 => 1", [
      group([
        query(
          ".chat-message-received ",
          animate(100, style({ transform: "scale(0)", overflow: "hidden" }))
        ),
        query(
          ".chat-message-sent ",
          animate(100, style({ transform: "scale(0)", overflow: "hidden" }))
        ),
        query(".chat-content", [
          style({ overflow: "hidden" }),
          animate(100, style({ height: 0, overflow: "hidden" })),
        ]),
      ]),
      animate("200ms"),
    ]), */

  transition("1 => 0", animate("200ms")),

  transition("0 => 1", animate("200ms")),
]);
