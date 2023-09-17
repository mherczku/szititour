import { Pipe, PipeTransform } from "@angular/core";
import {environment} from "../../../environments/environment";

@Pipe({
  name: "imgSrc"
})
export class ImgSrcPipe implements PipeTransform {

  transform(value?: string): string {
    if(value === null || value === "") {
      return "";
    }
    return environment.apiBaseUrl + "/resources/" + value;
  }

}
