import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'flight-navbar',
  templateUrl: 'navbar.component.html',
})
export class NavbarComponent {
  private sidebarVisible = false;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  sidebarToggle() {
    const body = this.document.body;

    if (!this.sidebarVisible) {
      body.classList.add('nav-open');
      this.sidebarVisible = true;
    } else {
      this.sidebarVisible = false;
      body.classList.remove('nav-open');
    }
  }
}
