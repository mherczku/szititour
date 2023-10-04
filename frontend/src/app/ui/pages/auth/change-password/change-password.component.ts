import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PasswordChangeComponent } from "../../../components/password-change/password-change.component";

@Component({
    standalone: true,
    selector: "app-password-change-auth",

    templateUrl: "./change-password.component.html",
    styleUrls: ["./change-password.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, PasswordChangeComponent]
})
export class ChangePasswordComponent {


}

