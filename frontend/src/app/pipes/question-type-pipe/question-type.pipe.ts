import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'questionType'
})
export class QuestionTypePipe implements PipeTransform {

  transform(value?: string): string {
    switch (value) {
      case "shortText":
        return "Rövid szöveg"

      case "longText":
        return "Hosszú szöveg"

      case "number":
        return "Szám"

      case "imgOnly":
        return "Kép"

      case "year":
        return "Évszám"

      default:
        return ""
    }
  }

}
