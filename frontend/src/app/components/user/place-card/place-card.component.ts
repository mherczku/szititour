import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ActivePlace} from "../../../types/place";

@Component({
  selector: "app-place-card",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./place-card.component.html",
  styleUrls: ["./place-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceCardComponent {

  @Input() place!: ActivePlace;
  @Input() index = 0;
  @Input() selected = false;

}
