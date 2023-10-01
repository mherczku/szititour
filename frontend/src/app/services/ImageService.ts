import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";


@Injectable({ providedIn: "root" })
export class ImageService {

  images = new Map<string, Blob>();
  loader = "assets/svg/loader.svg";

  getImageUrl(src: string): Observable<string> {
    const resToken = src.split("&&resToken=")[1];
    const url = src.split("&&resToken=")[0];

    const Sb = new ReplaySubject<string>();

    if (this.images.has(url)) {
      Sb.next(this.getUrl(this.images.get(url)));
      Sb.complete();
    }
    else {
      Sb.next(this.loader);

      this.fetchImage(url, resToken).then((b) => {
        Sb.next(this.getUrl(b));
        Sb.complete();

      });
    }
    return Sb.asObservable();
  }

  private async fetchImage(url: string, resToken: string): Promise<Blob> {

    const response = await fetch(url, {
      cache: "default",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Ngrok-Skip-Browser-Warning": "yes",
        "resToken": resToken
      }
    });
    const image = await response.blob();
    this.images.set(url, image);
    return image;
  }

  private getUrl(image?: Blob): string {
    if (image) {
      return URL.createObjectURL(image);
    }
    return "";
  }

}


