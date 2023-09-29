import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";


@Injectable({ providedIn: "root" })
export class ImageService {

  images = new Map<string, Blob>();
  loader = "assets/svg/loader.svg";

  getImageUrl(src: string): Observable<string> {
    const Sb = new ReplaySubject<string>();

    if (this.images.has(src)) {
      Sb.next(this.getUrl(this.images.get(src)));
      Sb.complete();
    }
    else {
      Sb.next(this.loader);
      this.fetchImage(src).then((b) => {
        Sb.next(this.getUrl(b));
        Sb.complete();

      });
    }
    return Sb.asObservable();
  }

  private async fetchImage(src: string): Promise<Blob> {
    const response = await fetch(src, {
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Ngrok-Skip-Browser-Warning": "yes"
      }
    });
    const image = await response.blob();

    if (!src.includes("resources/images")) {
      this.images.set(src, image);
    }
    return image;
  }

  private getUrl(image?: Blob): string {
    if (image) {
      return URL.createObjectURL(image);
    }
    return "";
  }

}


