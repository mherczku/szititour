import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PasswordChangeComponent } from "../../../components/password-change/password-change.component";

@Component({
    selector: "app-password-change-user",
    standalone: true,
    templateUrl: "./password.component.html",
    styleUrls: ["./password.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, PasswordChangeComponent]
})
export class PasswordComponent {

}
