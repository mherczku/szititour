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
import { Observable, forkJoin, tap } from "rxjs";
import { ImgSrcModule } from "../../../../pipes/img-src/img-src.module";
import { ImageUploaderComponent } from "../../../components/image-uploader/image-uploader.component";
import { ImgLoaderPipe } from "../../../../pipes/img-loader.pipe";

@Component({
    standalone: true,
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, ReactiveFormsModule, TextInputComponent, ButtonsComponent, ClientCardComponent, TogglerComponent, ImgSrcModule, ImageUploaderComponent, ImgLoaderPipe]
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
  $deleting = signal(false);

  $pushState = this.pushService.$state;

  $newImgFile: WritableSignal<File | undefined> = signal(undefined);

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

  ngOnInit(): void {
    this.authService.authorizeMe().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
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
    const obs: Observable<unknown>[] = [];
    if (!this.isSame) {
      const updateData: TeamUpdateProfile = {
        name: this.$profile().name,
        members: this.$profile().members
      };
      obs.push(this.userService.updateProfile(updateData).pipe(takeUntilDestroyed(this.destroyRef)));
    }
    const newFile = this.$newImgFile();
    if (newFile) {
      obs.push(this.userService.updateImage(newFile).pipe(tap(() => {
        this.$newImgFile.set(undefined);
      }), takeUntilDestroyed(this.destroyRef)));
    }
    forkJoin(obs).subscribe({ complete: () => this.$saving.set(false), error: () => this.$saving.set(false) });
  }

  saveEmail() {
    this.$saving.set(true);
    this.userService.updateEmail(this.$profile().email).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({ complete: () => this.$saving.set(false) });
  }

  cancelEmailChange() {
    this.$saving.set(true);
    this.userService.updateEmail(this.authService.$currentTeamR()?.email ?? "").pipe(takeUntilDestroyed(this.destroyRef)).subscribe({ complete: () => this.$saving.set(false) });
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
    if (this.$pushState() === "true") {
      this.pushService.unsubscribeFromTopic().subscribe();
    } else if (this.$pushState() === "false" || this.$pushState() === "blocked") {
      this.pushService.requestPushNoti();
    }
  }

  fileChange(file: File) {
      this.$newImgFile.set(file);
  }

  deleteAccount(pass: string | undefined = undefined) {
    if (this.$deleting() && pass && pass.length > 0) {
      this.userService.deleteAccount(pass).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    } else {
      this.$deleting.set(true);
    }
  }
}
