import {Component, Input} from "@angular/core";
import {Place} from "../../../../types/place";
import {ImgSrcModule} from "../../../../pipes/img-src/img-src.module";
import {ButtonsComponent} from "../../buttons/buttons.component";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: "app-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.css"],
  imports: [
    ImgSrcModule,
    ButtonsComponent,
    NgIf,
    NgClass,
    RouterLink,
    NgForOf
  ],
  standalone: true
})
export class DropdownComponent {

  @Input() place: Place = {id: -1, name: "TestPlace", img: "", gameId: -1, address: "", latitude: 0, longitude: 0, questions: []};
  @Input() number!: number;

  open = false;

  toggle($event: MouseEvent) {
    this.open = !this.open;
    $event.stopPropagation();
  }
}
