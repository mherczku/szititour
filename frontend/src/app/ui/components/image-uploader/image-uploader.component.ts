import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, WritableSignal, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ImgSrcModule } from "../../../pipes/img-src/img-src.module";

@Component({
  selector: "app-image-uploader",
  standalone: true,
  templateUrl: "./image-uploader.component.html",
  styleUrls: ["./image-uploader.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ImgSrcModule]
})
export class ImageUploaderComponent {

  $newImageSrc: WritableSignal<string | undefined | ArrayBuffer | null> = signal(undefined);

  $dragging = signal(false);

  @Input({ required: true }) src?: string | null;

  @Output() fileChanged: EventEmitter<File> = new EventEmitter();

  readFile(event: any) {
    this.onLeave();
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.fileChanged.emit(file);
      const reader = new FileReader();
      reader.onload = () => this.$newImageSrc.set(reader.result);
      reader.readAsDataURL(file);
    }
  }

  onEnter() {
    this.$dragging.set(true);
  }

  onLeave() {
    this.$dragging.set(false);
  }

}
