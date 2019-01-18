import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JarwisService {

  private baseUrl="http://localhost:5278/api/";
  constructor(private http: HttpClient) { }

  register(account, httpOptions){
    return this.http.post(this.baseUrl+"signup", account, httpOptions)
  }
  login(account, httpOptions){
    return this.http.post(this.baseUrl+"login", account, httpOptions)
  }
  sendPasswordResetLink(account, httpOptions){
    return this.http.post(this.baseUrl+"sendPasswordResetLink", account, httpOptions)
  }
}
