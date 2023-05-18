import {Component, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Store} from "@ngrx/store";
import {selectLoggedInTeam} from "../../../../store/selectors/auth.selector";
import {TextInputComponent} from "../../../components/admin/inputs/text-input/text-input.component";
import {ButtonsComponent} from "../../../components/buttons/buttons.component";
import {Team, UpdateTeam} from "../../../../types/team";
import {Subject, takeUntil, tap} from "rxjs";
import {UserService} from "../../../../services/UserService";
import {AutoDestroy} from "../../../../decorators/autodestroy.decorator";
import {login} from "../../../../store/actions/auth.actions";

@Component({
  standalone: true,
  imports: [CommonModule, TextInputComponent, ButtonsComponent],
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {

  teamProfile$ = this.store.select(selectLoggedInTeam).pipe(tap(p => {
    p ? this.profile = {...p} : undefined;
    p ? this.profileBase = {...p} : undefined;
  }));
  public profile?: Team;
  public profileBase?: Team;

  saving = false;
  @AutoDestroy destroy = new Subject();

  constructor(private store: Store, private userService: UserService) {

  }

  ngOnInit(): void {

  }

  addMember() {
    const name: string | null = prompt("Új csapattag neve?");
    if (name) {
      let a: string[] = [];
      a = a.concat(this.profile?.members ?? []).flat(1);
      a.push(name);
      this.profile?.members ? this.profile.members = a : undefined;
    }
  }

  get isSame(): boolean {
    return JSON.stringify(this.profile) === JSON.stringify(this.profileBase)
  }


  saveProfile() {
    this.saving = true;
    const update: UpdateTeam = {};
    if (this.profile?.name !== this.profileBase?.name) {
      update.name = this.profile?.name;
    }
    if (this.profile?.email !== this.profileBase?.email) {
      update.email = this.profile?.email;
    }
    if (this.profile?.img !== this.profileBase?.img) {
      update.img = this.profile?.img;
    }
    update.members = this.profile?.members;
    // todo password
    this.userService.saveProfile(update).pipe(takeUntil(this.destroy)).subscribe(team => {
      this.store.dispatch(login({team: team}));
      this.saving = false;
    });

  }
}
