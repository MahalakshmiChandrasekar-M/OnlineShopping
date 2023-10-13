import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';
import { AddToService } from '../AddTo.service';
import { LoginService } from '../Login.service';

@Component({
  selector: 'app-MakeUp',
  templateUrl: './MakeUp.component.html',
  styleUrls: ['./MakeUp.component.css']
})
export class MakeUpComponent implements OnInit {

  array:any="";
  constructor(private db:DbService, private service:AddToService, private loginService:LoginService) { }

  ngOnInit() {
    this.db.getMakeUp().subscribe(data=>
      {
        this.array=data;
      })
  }

  isAdminUser:boolean=this.loginService.userType()

 addCart(product:any)
 {
   this.service.addToCart(product)
 }

 addWishlist(product:any)
 {
  this.service.addToWishlist(product)
 }

}
