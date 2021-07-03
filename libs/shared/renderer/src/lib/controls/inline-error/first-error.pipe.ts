import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstError',
})
export class FirstErrorPipe implements PipeTransform {
  transform(errors: { [errorName: string]: boolean | any }, controlName): unknown {
    if (!errors) {
      return null;
    }

    const firstError = Object.entries(errors).find(
      (entry) => entry[1] !== false
    );

    return firstError ? controlName + '.' + firstError[0] : undefined;
  }
}
