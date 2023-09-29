import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoaderService } from "src/app/services/Loader.service";

@Component({
  selector: "app-container-loader",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: "./container-loader.component.html",
  styleUrls: ["./container-loader.component.scss"]
})
export class ContainerLoaderComponent {

  $loading = this.loaderService.$loading;

  constructor(
    private readonly loaderService: LoaderService
  ) { }

}
