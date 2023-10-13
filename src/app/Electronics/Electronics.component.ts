import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';
import { AddToService } from '../AddTo.service';
import { LoginService } from '../Login.service';

@Component({
  selector: 'app-Electronics',
  templateUrl: './Electronics.component.html',
  styleUrls: ['./Electronics.component.css']
})
export class ElectronicsComponent implements OnInit {

  Products:any="";


  constructor(private db:DbService, private service:AddToService,private loginService:LoginService) {
    this.db.getElectronics().subscribe(data=>{
      this.Products=data;
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

  ngOnInit() {}
}
