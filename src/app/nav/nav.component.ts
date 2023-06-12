import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  public menuIcon: string = 'menu';
  public menuOpen: boolean = true;

  menuClick(): void {
    if (this.menuOpen) {
      this.menuIcon = 'menu_open';
      this.menuOpen = !this.menuOpen;
    } else {
      this.menuIcon = 'menu';
      this.menuOpen = !this.menuOpen;
    }
  }
}
