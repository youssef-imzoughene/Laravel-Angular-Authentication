import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { HttpHeaders} from '@angular/common/http';
import { JarwisService} from '../../jarwis.service'
import { TokenService} from '../../Services/token.service'

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
              private _tokenService:TokenService
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
      }
      
     ); 
  }

  handlerResponse(data){
    //console.log(data.access_token);
    if(typeof data.access_token != undefined){
      //console.log(data.access_token);
      this._tokenService.handle(data.access_token)
    }else{
      this.error=data;
    }
    
  }
 

}
