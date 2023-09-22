import { ChangeDetectionStrategy, Component, DestroyRef, Input, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientData } from "src/app/services/AuthService";
import { UserService } from "src/app/services/UserService";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { take } from "rxjs";

@Component({
  selector: "app-client-card",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./client-card.component.html",
  styleUrls: ["./client-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientCardComponent {

  @Input({required: true}) client!: ClientData;

  $loading = signal(false);

  constructor(
    private readonly userService: UserService,
    private readonly destroyRef: DestroyRef) {}

  revokeAccess() {
    if(this.client.tokenId) {
      this.$loading.set(true);
      this.userService.revokeToken("ALMAAA").pipe(take(1), takeUntilDestroyed(this.destroyRef)).subscribe({
        complete: () => this.$loading.set(false),
        error: () => this.$loading.set(false)
      });
    }
  }

}
