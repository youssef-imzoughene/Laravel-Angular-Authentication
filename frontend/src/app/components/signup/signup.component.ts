import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { HttpHeaders} from '@angular/common/http';
import { JarwisService} from '../../jarwis.service'


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
  constructor(private _service:JarwisService) { }

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

