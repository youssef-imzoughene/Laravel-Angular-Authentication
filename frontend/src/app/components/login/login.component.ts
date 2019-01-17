import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {  tap } from 'rxjs/operators';
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
  constructor(private http: HttpClient) { }

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
    /*
    return this.http.post("http://localhost:5278/api/test", account, httpOptions).subscribe(
      tap((data) => {
        console.log(data)
      }),
      (error)=>{
        this.handlerError(error)
      }
      
     );
     */
    return this.http.post("http://localhost:5278/api/login", account, httpOptions).subscribe(
      tap((data) => {
        console.log(data)
      }),
      (error)=>{
        this.handlerError(error)
      }
      
     ); 
  }

  handlerError(error){
    this.error=error.error.error;
  }
 

}
