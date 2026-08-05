import { Component } from '@angular/core';

@Component({
  selector: 'app-copyright',
  templateUrl: './copyright.component.html',
  styleUrls: ['./copyright.component.css'],
})
export class CopyrightComponent {
  /** Beats hard-coding the year and forgetting about it in January. */
  readonly year = new Date().getFullYear();
}
