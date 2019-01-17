import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../Services/auth.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn:boolean
  constructor(
    private _authService:AuthService
  ) { }

  ngOnInit() {
    this._authService.authStatus.subscribe(
      feedback=>this.loggedIn=feedback
    )
  }

}