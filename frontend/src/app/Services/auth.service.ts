import { Injectable } from '@angular/core';
import * as Rx from "rxjs";
import { TokenService} from '../Services/token.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new Rx.BehaviorSubject<boolean>(this._token.loggedIn());
  authStatus=this.loggedIn.asObservable();

  changeAuthStatus(value:boolean){
    this.loggedIn.next(value)
  }

  constructor(private _token:TokenService) { }
}