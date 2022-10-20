import { Component, Injectable, Input, OnInit } from '@angular/core';
import { CalculatorService } from '../services/calculator.service';
import { take } from 'rxjs';

@Component({
  selector: 'flight-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.scss'],
})
export class HelloWorldComponent implements OnInit {
  @Input() name = 'world';
  @Input() isFine = true;

  arr = [1, 2, 3];

  constructor(private calculatorService: CalculatorService) {}

  ngOnInit(): void {
    this.calculatorService
      .add(1, 2)
      .pipe(take(1))
      .subscribe((result) => console.log(result));
  }
}
