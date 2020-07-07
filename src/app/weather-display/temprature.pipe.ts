import { Pipe, PipeTransform } from '@angular/core';
import { temperature } from 'units-converter';

@Pipe({
  name: 'temprature',
})
export class TempraturePipe implements PipeTransform {
  transform(value: number, system?: 'metric' | 'imperial'): number {
    switch (system) {
      case 'metric':
        return temperature(value).from('K').to('C').value.toFixed(2);
      case 'imperial':
        return temperature(value).from('K').to('F').value.toFixed(2);
      default:
        return value;
    }
  }
}
