import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "yesNoPipe"
})
export class YesNoPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return (value == true) ? "Yes" : "No";
  }
}