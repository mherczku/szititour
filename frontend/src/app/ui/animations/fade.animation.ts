import { style, query, group, animate } from "@angular/animations";

export const fadeAnimation = [
  style({ position: "relative" }),
  query(":enter, :leave", [
    style({
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%"
    })
  ], { optional: true }),
  group([
    query(":enter", [
      style({ opacity: 0 }),
      animate("250ms 250ms ease", style({ opacity: 1 }))
    ], { optional: true }),
    query(":leave", [
      style({ opacity: 1 }),
      animate("250ms ease", style({ opacity: 0 }))
    ], { optional: true }),
  ])
];
