import { Pipe, PipeTransform } from '@angular/core';
import { speed } from 'units-converter';

@Pipe({
  name: 'speed',
})
export class SpeedPipe implements PipeTransform {
  transform(value: number, system?: 'metric' | 'imperial'): number {
    switch (system) {
      case 'metric':
        return speed(value).from('m/s').to('km/h').value.toFixed(2);
      case 'imperial':
        return speed(value).from('hPa').to('m/h').value.toFixed(2);
      default:
        return value;
    }
  }
}
