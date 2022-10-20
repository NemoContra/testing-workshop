import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CalculatorService {
  public add(nr1: number, nr2: number): number {
    return nr1 + nr2;
  }
}
