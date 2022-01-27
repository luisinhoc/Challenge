import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sanitizeHtml' })
export class sanitizeHtmlPipe implements PipeTransform {
  transform(value?: string) {
    return value?.split('< ').join('<');
  }
}
