import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { HttpHeaders} from '@angular/common/http';
import { JarwisService} from '../../../jarwis.service'
import {SnotifyService} from 'ng-snotify';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {

  form={
    email:''
  }

  constructor(
    private _service:JarwisService,
    private snotifyService: SnotifyService) { }

  ngOnInit() {
  }
  onSubmit(f: NgForm) {
    this.snotifyService.info('Wait...',{timeout:5000});

    const httpOptions = {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		};

    let account = f.value;
    console.log(account);

    this._service.sendPasswordResetLink(account, httpOptions).subscribe(
      (data) => {
        console.log(data);
        this.handlerResponse(data)
      },
      (error) =>{
        console.log(error.error.error);
        this.snotifyService.error(error.error.error,{timeout:0})
      }
     );
  }

  handlerResponse(data){
    this.form.email=null;
    this.snotifyService.success(data.data,{timeout:0})
  }
}
