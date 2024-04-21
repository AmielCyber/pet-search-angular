import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'distanceDescription'
})
export class DistanceDescriptionPipe implements PipeTransform {

  transform(value: string | null): string {
    if (value == null) return "";

    const valueNum = parseInt(value);
    if (isNaN(valueNum)) return "";

    return `${value} mile${valueNum > 1 ? "s" : ""} away`;
  }

}
