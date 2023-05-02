import {Pipe, PipeTransform} from "@angular/core";
import {ActivePlace, Place} from "../../types/place";

@Pipe({
  name: "convertToActivePlace",
  standalone: true,
  pure: true
})
export class ConvertToActivePlacePipe implements PipeTransform {

  transform(value: Place): ActivePlace {
    return {
      id: value.id,
      img: value.img,
      name: value.name,
      questions: value.questions,
      selectable: true
    };
  }

}
