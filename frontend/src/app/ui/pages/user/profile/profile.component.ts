import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, WritableSignal, effect, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TextInputComponent } from "../../../components/admin/inputs/text-input/text-input.component";
import { ButtonsComponent } from "../../../components/buttons/buttons.component";
import { Team, TeamUpdatePassword, TeamUpdateProfile } from "../../../../types/team";
import { UserService } from "../../../../services/UserService";
import { AuthService } from "src/app/services/AuthService";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { confirmPassword } from "src/app/validators/same-pass.validator";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ClientCardComponent } from "../../../components/user/client-card/client-card.component";
import { TogglerComponent } from "../../../components/toggler/toggler.component";
import { PushNotificationService } from "src/app/services/PushNotification.service";

@Component({
  standalone: true,
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, TextInputComponent, ButtonsComponent, ClientCardComponent, TogglerComponent]
})
export class ProfileComponent {

  $profile: WritableSignal<Team> = signal({
    id: -1,
    name: "Ismeretlen",
    email: "",
    nextEmail: "",
    role: "ROLE_USER",
    members: [],
    clients: []
  });

  $saving = signal(false);

  $pushState = this.pushService.$state;

  passwordForm!: FormGroup;

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly pushService: PushNotificationService,
    private readonly destroyRef: DestroyRef,
    private readonly fb: FormBuilder,
  ) {

    effect(() => {
      const team = this.authService.$currentTeamR();
      if (team) {
        const a = { ...team };
        a.members = [...a.members];
        this.$profile.set(a);
      }
    }, { allowSignalWrites: true });

    this.passwordForm = this.fb.group({
      oldPassword: ["", [Validators.required]],
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required, confirmPassword()]],
    });
  }


  addMember() {
    this.$profile().members.push("Játékos neve");
    /*  this.$profile.update(p => {
      p.members.push("Játékos neve");
      return p;
     }); */
  }

  get isSame(): boolean {
    return JSON.stringify(this.$profile()) === JSON.stringify(this.authService.$currentTeamR());
  }

  get isEmailSame(): boolean {
    return this.$profile().email === this.authService.$currentTeamR()?.email;
  }


  saveProfile() {
    this.$saving.set(true);
    const updateData: TeamUpdateProfile = {
      name: this.$profile().name,
      members: this.$profile().members
    };
    this.userService.updateProfile(updateData).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({ complete: () => this.$saving.set(false) });
  }

  saveEmail() {
    this.$saving.set(true);
    this.userService.updateEmail(this.$profile().email).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({ complete: () => this.$saving.set(false) });
  }

  savePassword() {
    this.$saving.set(true);
    const updateData: TeamUpdatePassword = {
      oldPassword: this.passwordForm.value.oldPassword,
      newPassword: this.passwordForm.value.password
    };
    this.userService.updatePassword(updateData).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({ complete: () => this.$saving.set(false) });
  }

  togglePushNoti() {
    if(this.$pushState() === "true") {
      this.pushService.unsubscribeFromTopic().subscribe();
    } else if(this.$pushState() === "false" || this.$pushState() === "blocked") {
      this.pushService.requestPushNoti();
    }
  }

  //TODOS bfejezni kép csere
}
