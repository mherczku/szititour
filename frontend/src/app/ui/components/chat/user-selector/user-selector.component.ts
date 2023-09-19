import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { SimpleUser } from "../chat.component";
import { CommonModule } from "@angular/common";

@Component({
  standalone: true,
  selector: "app-user-selector",
  templateUrl: "./user-selector.component.html",
  styleUrls: ["./user-selector.component.scss"],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSelectorComponent implements OnInit {
  @Input({ required: true }) users!: SimpleUser[];
  _isHidden!: boolean;
  @Input() set isHidden(value: boolean) {
    this._isHidden = value;
    if(this._isHidden) {
      this.isOpen = false;
    }
  }

  @Input() set selectedUserI(value: SimpleUser | undefined) {
    if(value) {
      this.selectedUser = value;
    }
  }

  selectedUser!: SimpleUser;

  @Output() selectedUserChange = new EventEmitter<SimpleUser>();

  isOpen = false;

  ngOnInit(): void {
    this.selectedUser = this.users[0] ?? {
      name: "Én",
      online: false,
      newMessages: 0,
      messages: [],
    };
    this.selectedUserChange.emit(this.selectedUser);
  }

  toggle(event: Event): void {
    if (!this._isHidden || this.isOpen) {
      event.stopPropagation();
    }
    this.isOpen = !this.isOpen;
  }

  selectUser(user: SimpleUser) {
    this.isOpen = false;
    this.selectedUser = user;
    this.selectedUserChange.emit(this.selectedUser);
  }
}
