import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { HttpHeaders} from '@angular/common/http';
import { JarwisService} from '../../jarwis.service'
import { TokenService} from '../../Services/token.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  error:any;
  form = {
    email:'',
    name:'',
    password:'',
    password_confirmation:''
  };
  constructor(private _service:JarwisService,
    private _tokenService:TokenService,
    private _router:Router) { }

  ngOnInit() {
    console.log(this.form);
    
  }

  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
  
    const httpOptions = {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		};
  
    let account = f.value;
    console.log(account);
    this._service.register(account,httpOptions).subscribe(
      (data) => {
        this.handlerResponse(data)
      }
      
     ); 
  }

  handlerResponse(data){
    //console.log(data.access_token);
    if(typeof data._token != undefined){
      //console.log(data.access_token);
      this._tokenService.handle(data._token)
      if(this._tokenService.isValid()){
        this._router.navigateByUrl('profile');
      }  
    }else{
      this.error=data;
    }
    
  }
}

