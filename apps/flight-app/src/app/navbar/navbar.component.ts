import { Component, Renderer2 } from '@angular/core';
import { getHTMLBodyElement } from '../common/get-body';

@Component({
  selector: 'flight-navbar',
  templateUrl: 'navbar.component.html',
})
export class NavbarComponent {
  private sidebarVisible = false;

  private body = getHTMLBodyElement();

  constructor(private renderer: Renderer2) {}

  sidebarToggle(): void {
    if (this.sidebarVisible) {
      this.sidebarVisible = false;
      this.body.classList.remove('nav-open');
      this.renderer.removeClass(this.body, 'nav-open');
      return;
    }

    this.sidebarVisible = true;
    this.renderer.addClass(this.body, 'nav-open');
  }
}
