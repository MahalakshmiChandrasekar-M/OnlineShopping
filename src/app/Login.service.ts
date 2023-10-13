import { Injectable } from '@angular/core';
//import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
isLoggedIn:boolean=false;
userName:string="";
userDetails:any;
user:any;

constructor() { }

login(username:string)
{
  this.userName=username;
  this.isLoggedIn=true;
  return this.isLoggedIn;
}

isUserLoggedIn():boolean{
  this.user = localStorage.getItem("username");
  if(this.user)
  {
    return true;
  }
  else
  {
    return false;
  }
}

userType()
{
  this.user = localStorage.getItem("userType");
  if(this.user=="Admin")
  {
    return true;
  }
  else
  {
    return false;
  }
}

logoutUser():void{
  localStorage.clear();
  this.isLoggedIn=false;
}

}
