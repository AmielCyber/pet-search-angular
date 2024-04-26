import {ChangeDetectionStrategy, Component} from '@angular/core';

import {ROUTER_TOKENS} from "../../app.routes";

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrl: './top-nav-bar.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopNavBarComponent {
  readonly ROUTER_TOKENS = ROUTER_TOKENS;
}
