import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';
import { AddToService } from '../AddTo.service';
import { LoginService } from '../Login.service';

@Component({
  selector: 'app-Fragrance',
  templateUrl: './Fragrance.component.html',
  styleUrls: ['./Fragrance.component.css']
})
export class FragranceComponent implements OnInit {

  constructor(private db:DbService, private addTo:AddToService, private loginService:LoginService){ }

  Products:any="";


  ngOnInit() {
    this.db.getFragrance().subscribe(data=>
      {
          this.Products=data;
      })
  }

  isAdminUser:boolean=this.loginService.userType()

 addCart(product:any)
 {
   this.addTo.addToCart(product)
 }

 addWishlist(product:any)
 {
  this.addTo.addToWishlist(product)
 }

}
