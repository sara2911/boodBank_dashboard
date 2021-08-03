import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transData'
})
export class TransDataPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
