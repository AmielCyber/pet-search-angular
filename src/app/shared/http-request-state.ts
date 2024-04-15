import {HttpErrorResponse} from "@angular/common/http";

export interface HttpRequestState<T> {
  isLoading: boolean;
  data?: T;
  error?: HttpErrorResponse | Error;
}
