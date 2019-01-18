import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../Services/auth.service'
import { Router } from '@angular/router'
import { TokenService} from '../../Services/token.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn:boolean
  constructor(
    private _authService:AuthService,
    private _router:Router,
    private _tokenService:TokenService,
  ) { }

  ngOnInit() {
    this._authService.authStatus.subscribe(
      feedback=>this.loggedIn=feedback
    )
  }

  logout(event:MouseEvent){
    event.preventDefault();
    this._authService.changeAuthStatus(false);
    this._tokenService.remove();
    this._router.navigateByUrl('login');
  }

}