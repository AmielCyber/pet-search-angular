import {Component} from '@angular/core';

import {ROUTER_TOKENS} from "../../app.routes";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: '../error-page/error-page.component.sass'
})
export class NotFoundComponent {
  protected HOME_ROUTE = ROUTER_TOKENS.HOME
}
