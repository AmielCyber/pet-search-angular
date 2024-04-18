import {HttpErrorResponse} from "@angular/common/http";

export interface HttpRequestStateModel<T> {
  isLoading: boolean;
  data?: T;
  error?: HttpErrorResponse | Error;
}
