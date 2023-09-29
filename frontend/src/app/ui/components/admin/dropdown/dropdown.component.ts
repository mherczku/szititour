import { ChangeDetectionStrategy, Component, Input, signal } from "@angular/core";
import { Place } from "../../../../types/place";
import { ImgSrcModule } from "../../../../pipes/img-src/img-src.module";
import { ButtonsComponent } from "../../buttons/buttons.component";
import { CommonModule, NgClass, NgForOf, NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";
import { ImgLoaderPipe } from "../../../../pipes/img-loader.pipe";

@Component({
  selector: "app-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.css"],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ImgSrcModule,
    ButtonsComponent,
    NgIf,
    NgClass,
    RouterLink,
    NgForOf,
    ImgLoaderPipe,
    CommonModule
  ]
})
export class DropdownComponent {

  @Input() place: Place = { id: -1, name: "TestPlace", img: "", gameId: -1, address: "", latitude: 0, longitude: 0, questions: [] };
  @Input() number!: number;

  $open = signal(false);

  toggle($event: MouseEvent) {
    this.$open.set(!this.$open());
    $event.stopPropagation();
  }
}
