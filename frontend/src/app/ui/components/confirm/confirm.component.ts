import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConfirmService } from "src/app/services/Confirm.service";

@Component({
  selector: "app-confirm",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./confirm.component.html",
  styleUrls: ["./confirm.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmComponent {

  $confirmData = this.confirmService.$data;
  $active = this.confirmService.$active;

  constructor(
    private readonly confirmService: ConfirmService
  ) {}

  confirm() {
    this.confirmService.toConfirm();
  }

  reject() {
    this.confirmService.toReject();
  }
}
