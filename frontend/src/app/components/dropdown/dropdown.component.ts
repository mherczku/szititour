import {Component, Input} from "@angular/core";
import {Place} from "../../types/place";

@Component({
  selector: "app-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.css"]
})
export class DropdownComponent {

  @Input() place: Place = {id: -1, name: "TestPlace", img: "", gameId: -1, address: "", latitude: "", longitude: "", questions: []};
  @Input() number!: number;

  open = false;

  toggle($event: MouseEvent) {
    this.open = !this.open;
    $event.stopPropagation();
  }
}
