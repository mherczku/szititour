import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-toggler",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./toggler.component.html",
  styleUrls: ["./toggler.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TogglerComponent {

  @Input({required: true}) isOn!: boolean;

}
