import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, WritableSignal, effect, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";
import { TextInputComponent } from "../../../components/admin/inputs/text-input/text-input.component";
import { ButtonsComponent } from "../../../components/buttons/buttons.component";
import { Team, UpdateTeam } from "../../../../types/team";
import { UserService } from "../../../../services/UserService";
import { AuthService } from "src/app/services/AuthService";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { confirmPassword } from "src/app/validators/same-pass.validator";

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextInputComponent, ButtonsComponent],
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {

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

  passwordForm!: FormGroup;

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
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

  ngOnInit(): void {

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

    /* this.userService.saveProfile(update).pipe(takeUntil(this.destroy)).subscribe(team => {
      this.store.dispatch(login({team: team}));
      this.saving = false;
    }); */

  }

  saveEmail() {
    this.$saving.set(true);
  }

  savePassword() {
    this.$saving.set(true);
  }

}
