import { Pipe, PipeTransform } from "@angular/core";
import { ImageService } from "../services/ImageService";
import { Observable } from "rxjs";

@Pipe({
  name: "imgLoader",
  standalone: true
})
export class ImgLoaderPipe implements PipeTransform {

  constructor(private readonly imgService: ImageService) {}

  transform(value?: string): Observable<string> | undefined {
    if(value === null || value === "" || value === undefined) {
      return undefined;
    } else {
      return this.imgService.getImageUrl(value);
    }
  }
}
