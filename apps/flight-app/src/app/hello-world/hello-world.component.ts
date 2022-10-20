import { Component, Input } from '@angular/core';

@Component({
  selector: 'flight-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.scss'],
})
export class HelloWorldComponent {
  @Input() name = 'world';
  @Input() isFine = true;

  arr = [1, 2, 3];
}
