import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { HttpHeaders} from '@angular/common/http';
import { JarwisService} from '../../jarwis.service'
import { TokenService} from '../../Services/token.service'
import { AuthService} from '../../Services/auth.service'

import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public form =  {
    email:null,
    password:null
  }
  constructor(private _service:JarwisService,
              private _tokenService:TokenService,
              private _authService:AuthService,
              private _router:Router
    ) { }

  ngOnInit() {

  }

  public error=null;

  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false

    const httpOptions = {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		};

    let account = f.value;
    console.log(account);

    this._service.login(account, httpOptions).subscribe(
      (data) => {
        this.handlerResponse(data)
      },
      (error)=>{
        console.log(error.error.error);
        this.error=error.error.error
        this.form.password=null;
      }

     );
  }

  handlerResponse(data){
    //console.log(data.access_token);
    if(typeof data.access_token != undefined){
      //console.log(data.access_token);
      this._tokenService.handle(data.access_token)
      if(this._tokenService.isValid()){
        this._authService.changeAuthStatus(true);
        this._router.navigateByUrl('profile');
      }
    }else{
      console.log(data);
      console.log(data.error);
      this.error=data.error;
    }

  }


}
