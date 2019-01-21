import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm} from '@angular/forms';
import { JarwisService} from '../../../jarwis.service'
import { HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router'
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {

  public error = [];
  public form = {
    email:null,
    passord:null,
    password_confirmation:null,
    resetToken:null
  }
  constructor(
    private _service:JarwisService,
    private _route:ActivatedRoute,
    private _router:Router,
    private _snotify:SnotifyService) { }

  ngOnInit() {
    this._route.queryParams.subscribe(params=>
    {
      this.form.resetToken=params['token'];
    })
  }

  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false

    const httpOptions = {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		};

    //let account = f.value;
    let account = this.form
    console.log(account);

    this._service.changePassword(account, httpOptions).subscribe(
      (data) => {
        this.handlerResponse(data)
      },
      (error)=>{
        this.error=error.error.errors;
      }

     );
  }

  handlerResponse(data){
    console.log(data);
    let _router = this._router
    this._snotify.confirm('Now login with new password', 'Done', {
      timeout: 0,
      showProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      buttons: [
        {text: 'Okay', action: toster => {
          _router.navigateByUrl('/login')
          this._snotify.remove(toster.id)
        }
          , bold: false}
      ]
    });
  }
}
