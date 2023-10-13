import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../Login.service';
import { DbService } from '../db.service';
//import { LoggerService } from '../Logger.service';
import { environment } from '../../Environments/environment';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-LoginPage',
  templateUrl: './LoginPage.component.html',
  styleUrls: ['./LoginPage.component.css']
})
export class LoginPageComponent implements OnInit {
  myForm: FormGroup;

userName:any="";
password:any="";

envUserName:any="";
envPassword:any="";
envPhonenumber:any="";
envEmail:any="";
envUserType:any="";
envId:any="";

retUrl:any="";
retLogin:any="Login"
userDetails:any="";
//userInfo:any;
loginStatus:any;
user:any;

  constructor(private logger:NGXLogger, private formBuilder: FormBuilder,private loginService:LoginService,private router:Router,private db:DbService) {
    this.myForm = this.formBuilder.group({
      username: ['', [Validators.required, usernameValidator]],
      password: ['', [Validators.required, passwordValidator]],
    });
  }

  ngOnInit() {
  }

  onLogin(){

    this.userName=this.myForm.value.username;
    this.password=this.myForm.value.password;
    this.logger.info("Entered user name = "+this.userName+" , Password = "+this.password);

    this.db.getUser().subscribe(data=>
          {
          this.userDetails=data;
          for(let user of this.userDetails)
          {
            if(this.userName === user.userName)
            {
              this.envUserName=user.userName;
              this.envPassword=user.password;
              this.envPhonenumber = user.phoneNumber;
              this.envEmail = user.email;
              this.envUserType = user.userType;
              this.envId = user.id;
              break;
            }
            else
            {
              this.envUserName = environment.userName;
              this.envPassword = environment.password;
              this.envPhonenumber = environment.phoneNumber;
              this.envEmail = environment.email;
              this.envUserType = environment.userType;
              this.envId = environment.id;
            }
          }
          if(this.userName === this.envUserName && this.password === this.envPassword)
          {
              this.loginStatus=this.loginService.login(this.user);
              this.logger.log("login Sucessful");

              var userInfo = {
                userName: this.envUserName,
                password: this.envPassword,
                phoneNumber: this.envPhonenumber,
                email: this.envEmail ,
                userType: this.envUserType,
                id: this.envId
              }
              this.db.addCurrentUser(userInfo).subscribe(data=>
                {
                  this.logger.info("Current User  = "+userInfo.userName);
                  //window.location.reload();
                })
                //localStorage.clear();
                localStorage.setItem('username',this.myForm.value.username);
                localStorage.setItem('userId',userInfo.id);
                localStorage.setItem('userType',userInfo.userType);
                this.router.navigate([this.retUrl]);
            }
            else
            {
              alert("Username or Password is Incorrect.! Try again.")
              this.logger.error("Login failed");
              window.location.reload();
            }
          })

      }
}

function usernameValidator(control: FormControl): { [key: string]: boolean } | null {
  const usernamePattern = /^[a-zA-Z]+$/; // Only alphabetic characters allowed
  const isValid = usernamePattern.test(control.value);
  return isValid ? null : { 'invalidUsername': true };
}

function passwordValidator(control: FormControl): { [key: string]: boolean } | null {
  const minLength = 6;
  const isValid = control.value.length >= minLength;
  return isValid ? null : { 'invalidPassword': true };
}
