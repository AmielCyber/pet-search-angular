import {Component, Input} from '@angular/core';
import {ROUTER_TOKENS} from "../../app.routes";

@Component({
  selector: 'app-home-link',
  templateUrl: './home-link.component.html',
})
export class HomeLinkComponent {
  protected appName = "Pet Search";
  @Input() homeLink!: string;
}
