import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {  tap } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public error={};
  public form =  {
    email:'',
    name:'',
    password:'',
    password_confirmation:''
  };
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
  
    const httpOptions = {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		};
  
    let account = f.value;
    console.log(account);
    return this.http.post("http://localhost:5278/api/signup", account, httpOptions).subscribe(
      (data) => {
        console.log(data)
        this.error=data
      },
      (error)=>{
        this.handlerError(error)
      }
      
     ); 
  }

  handlerError(error){
    this.error=error.error.errors;
  }
}
