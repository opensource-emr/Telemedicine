
import { AbstractControl, FormGroup } from '@angular/forms';


export function ConfirmedValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}
export function ValidateUserName(control: AbstractControl) {
  if (this.global.practiceArray.find(a => a.url == control.value.replace(/\s/g, "").toLowerCase())) {
    return { validUserName: true };
  }
  return null;
}
export function ValidateEmail(control: AbstractControl) {
  if (this.global.practiceArray.find(a => a.email == control.value)) {
    return { validEmail: true };
  }
  return null;
}