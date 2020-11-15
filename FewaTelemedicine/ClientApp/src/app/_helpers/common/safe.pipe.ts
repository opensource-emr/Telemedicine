import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(public sanitizer: DomSanitizer) { }

  public transform(value: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }
}