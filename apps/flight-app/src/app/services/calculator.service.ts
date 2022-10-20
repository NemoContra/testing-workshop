import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AddService {
  calculate(nr1: number, nr2: number): Observable<number> {
    return of(nr1 + nr2);
  }

  calculateUnsigned(nr1: number, nr2: number): Observable<number> {
    if (nr1 > 0 && nr2 > 0) {
      return of(nr1 + nr2);
    }

    return throwError(
      () => new Error('Both numbers must be greater than zero')
    );
  }
}

@Injectable({ providedIn: 'root' })
export class CalculatorService {
  constructor(private addService: AddService) {}

  public add(nr1: number, nr2: number): Observable<number> {
    return this.addService.calculate(nr1, nr2);
  }

  public addUnsigned(nr1: number, nr2: number): Observable<number> {
    return this.addService.calculateUnsigned(nr1, nr2);
  }
}
