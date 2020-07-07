import { Pipe, PipeTransform } from '@angular/core';
import { pressure } from 'units-converter';

@Pipe({
  name: 'pressure',
})
export class PressurePipe implements PipeTransform {
  /**
   * Angular Pipe to convert pressure values
   * @param value : Value in term of hectoPascal
   * @param system : System to covert
   */
  transform(value: number, system?: 'metric' | 'imperial'): number {
    switch (system) {
      case 'metric':
        return pressure(value).from('hPa').to('bar').value.toFixed(2);
      case 'imperial':
        return pressure(value).from('hPa').to('psi').value.toFixed(2);
      default:
        return value;
    }
  }
}
