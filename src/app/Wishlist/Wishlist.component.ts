import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';
import { AddToService } from '../AddTo.service';

@Component({
  selector: 'app-Wishlist',
  templateUrl: './Wishlist.component.html',
  styleUrls: ['./Wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(private db:DbService, private service:AddToService) { }


  allProducts:any="";

  ngOnInit() {
    this.db.getWishlist().subscribe(data=>
      {
        this.allProducts=data;
      })
  }

  //getting from local storage
 userName = localStorage.getItem("username");
 userId = localStorage.getItem("userId");

 addCart(product:any)
 {
   this.service.addCartWishlist(product)
 }

  removeWish(product:any)
  {
    this.service.deleteWishlist(product);
    window.location.reload();
  }

}
