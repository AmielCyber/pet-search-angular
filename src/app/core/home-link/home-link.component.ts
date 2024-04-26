import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-home-link',
  templateUrl: './home-link.component.html',
})
export class HomeLinkComponent {
  protected appName = "Pet Search";
  @Input() homeLink?: string;
}
