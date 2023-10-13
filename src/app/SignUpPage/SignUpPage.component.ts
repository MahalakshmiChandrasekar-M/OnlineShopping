import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbService } from '../db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-SignUpPage',
  templateUrl: './SignUpPage.component.html',
  styleUrls: ['./SignUpPage.component.css']
})
export class SignUpPageComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private db: DbService, private router:Router) {}

    signupForm!: FormGroup;
    serverErrorMessage:string="";
    retUrl:any="Login";
    wishlist=[];
    cart=[];

    ngOnInit() {
      this.signupForm=this.formBuilder.group(
        {
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
        },{validator: this.passwordMatchValidator});
      }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

  onSubmit() {
    var details={
      username:this.signupForm.value.username,
      email:this.signupForm.value.email,
      password:this.signupForm.value.password,
      confirmPassword:this.signupForm.value.confirmPassword,
      phone:this.signupForm.value.phone,
      userType:"User"
    }
    this.db.addUser(details).subscribe(data=>
      {
        alert("Register Successfully");
        this.router.navigate([this.retUrl]);
      })

  }
}
