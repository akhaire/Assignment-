import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'to-do';
  @ViewChild('sidenav') sidenav!: MatSidenav;

  opened!: boolean;
  
  clickHandler() {
    this.sidenav.close();
  }
}
