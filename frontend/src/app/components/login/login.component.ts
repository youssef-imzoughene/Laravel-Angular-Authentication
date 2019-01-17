import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { HttpHeaders} from '@angular/common/http';
import { JarwisService} from '../../jarwis.service'
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
  constructor(private _service:JarwisService) { }

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
        console.log(data)
      },
      (error)=>{
        this.handlerError(error)
      }
      
     ); 
  }

  handlerError(error){
    this.error=error.error.error;
  }
 

}
