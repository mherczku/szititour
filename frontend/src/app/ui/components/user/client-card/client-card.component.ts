import { ChangeDetectionStrategy, Component, DestroyRef, Input, OnInit, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthService, ClientData } from "src/app/services/AuthService";
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
export class ClientCardComponent implements OnInit {

  @Input({ required: true }) client!: ClientData;

  $loading = signal(false);
  isActive: boolean = this.authService.getTokenId() === this.client?.tokenId;

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly destroyRef: DestroyRef) {}

  ngOnInit(): void {
    this.isActive = this.authService.getTokenId() === this.client?.tokenId;
  }

  revokeAccess() {
    if (this.client.tokenId) {
      this.$loading.set(true);
      this.userService.revokeToken(this.client.tokenId).pipe(take(1), takeUntilDestroyed(this.destroyRef)).subscribe({
        complete: () => this.$loading.set(false),
        error: () => this.$loading.set(false)
      });
    }
  }

}
