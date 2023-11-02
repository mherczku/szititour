import { Pipe, PipeTransform } from "@angular/core";
import {environment} from "../../../environments/environment";

@Pipe({
  name: "imgSrc"
})
export class ImgSrcPipe implements PipeTransform {

  transform(value?: string): string | undefined {
    if(value === null || value === "" || undefined) {
      return undefined;
    }
    return environment.apiBaseUrl + "/resources/" + value;
  }

}
