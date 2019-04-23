import { DomSanitizer } from '@angular/platform-browser'
import { Component, NgModule, Pipe, PipeTransform } from '@angular/core'
@Pipe({ name: 'safehtml'})

export class SafeHtmlPipe implements PipeTransform  {
    constructor(private sanitized: DomSanitizer) {}
   transform(value) {
      return this.sanitized.bypassSecurityTrustHtml(value);
     }
}