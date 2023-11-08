import { Component, DestroyRef, EventEmitter, Input, Output, WritableSignal, signal } from "@angular/core";
import { Place } from "src/app/types/place";
import { Application } from "../../../../types/application";
import { AdminService } from "../../../../services/AdminService";
import { CommonModule, NgClass, NgForOf, NgIf } from "@angular/common";
import { ButtonsComponent } from "../../buttons/buttons.component";
import { DropdownComponent } from "../dropdown/dropdown.component";
import { RouterLink } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ImgSrcModule } from "../../../../pipes/img-src/img-src.module";
import { ImgLoaderPipe } from "../../../../pipes/img-loader.pipe";

@Component({
    selector: "app-lists",
    templateUrl: "./lists.component.html",
    styleUrls: ["./lists.component.scss"],
    standalone: true,
    styles: [`
    :host {
      width: 100%;
      max-width: 600px;
    }
  `],
    imports: [
        NgIf,
        NgForOf,
        NgClass,
        ButtonsComponent,
        DropdownComponent,
        RouterLink,
        ImgSrcModule,
        ImgLoaderPipe,
        CommonModule
    ]
})
export class ListsComponent {
  @Input() type: "applications" | "places" = "applications";
  @Input() set applications(value: Application[]) {
    this.$applications.set(value);
  }
  @Input() places: Place[] = [];
  @Input() gameIdForPlacesList = 0;

  $applications: WritableSignal<Application[]> = signal([]);

  @Output() applicationsChange: EventEmitter<Application[]> = new EventEmitter<Application[]>();

  reviewing = false;

  constructor(
    private readonly adminService: AdminService,
    private readonly destroyRef: DestroyRef) { }

  reviewApplication(application: Application, isAccepted: boolean) {
    this.reviewing = true;
    this.adminService.reviewApplication(application, isAccepted).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: value => {
        const foundIndex = this.$applications().findIndex(x => x.id == value.id);
        this.$applications()[foundIndex] = value;
        this.applications = this.$applications();
        this.applicationsChange.emit(this.$applications());
        this.reviewing = false;
      },
      error: () => {
        this.reviewing = false;
      }
    });
  }
}
