import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorPageService {
  private errorMessage: string = "";

  getLastErrorMessage(){
    const errorMsg = this.errorMessage;
    this.errorMessage = "";
    return errorMsg;
  }

  setErrorMessage(errorMessage:string){
    this.errorMessage = errorMessage;
  }
}
