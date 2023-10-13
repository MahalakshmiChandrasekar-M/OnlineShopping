import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';
import { AddToService } from '../AddTo.service';

@Component({
  selector: 'app-Cart',
  templateUrl: './Cart.component.html',
  styleUrls: ['./Cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private db:DbService, private service:AddToService) { }

  count=1;
  allProducts:any=null;
  discountPercentage!: number;
  remainingTime!: number;
  isRunning!:boolean;

  ngOnInit() {
    this.db.getCart().subscribe(data=>
      {
          this.allProducts=data;
      })
      console.log(this.allProducts)
  }

  deleteCartProduct(product:any)
  {
    this.service.deleteCart(product)
    window.location.reload();
  }

  placeOrder(product:any)
  {
    this.service.placeOrder(product)
  }
}

