import {Component, OnInit} from '@angular/core';

import {ROUTER_TOKENS} from "../../routes/router-tokens.model";
import {ErrorPageService} from "../services/error-page.service";

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.sass'
})
export class ErrorPageComponent implements OnInit {
  errorHeader: string = ""
  errorMessage: string = "";
  protected HOME_ROUTE = ROUTER_TOKENS.HOME

  constructor(private errorPageService: ErrorPageService) {
  }

  ngOnInit(): void {
    this.errorMessage = this.errorPageService.getLastErrorMessage()
    this.errorHeader = `Sorry, an ${this.errorMessage === ""? 'unexpected' : ''} error has occurred.`
  }
}
