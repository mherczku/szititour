import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function confirmPassword(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const pass = group.parent?.get("password")?.value;
    const confirmPass = group.value;
    return pass === confirmPass ? null : {notSame: true};
  };
}
