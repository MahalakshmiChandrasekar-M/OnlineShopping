import { Component, OnInit } from '@angular/core';
import { AddToService } from '../AddTo.service';
import { DbService } from '../db.service';
//import { LoggerService } from '../Logger.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-OrdersHistory',
  templateUrl: './OrdersHistory.component.html',
  styleUrls: ['./OrdersHistory.component.css']
})
export class OrdersHistoryComponent implements OnInit {

  constructor(private addTo:AddToService, private db:DbService,private logger:NGXLogger) { }

  //getting from local storage
 userName = localStorage.getItem("username");
 userId = localStorage.getItem("userId");

  option:any;
  allProducts:any;
  products:any=[];
  i=0;
  ngOnInit() {
    this.option=this.addTo.getOptions();
    this.logger.info("option = >"+this.option)
    this.db.getYourOrder().subscribe(data=>
      {
        this.allProducts=data;
        if(this.option.indexOf("Your Orders")!==-1)
          {
            for(let product of this.allProducts)
            {
              if(product.deliveryStatus.indexOf("InProcess")!==-1 && this.userId==product.userId)
              {
                this.products[this.i]=product;
                this.i++;
              }
            }
          }
          else if(this.option.indexOf("Cancelled Orders")!==-1)
          {
            for(let product of this.allProducts)
            {
              if(product.deliveryStatus.indexOf("Cancelled")!==-1 && this.userId==product.userId)
              {
                this.products[this.i]=product;
                this.i++;
              }
            }
          }
          else
          {
            for(let product of this.allProducts)
            {
              if(this.userId==product.userId)
              {
                this.products[this.i]=product;
                this.i++;
              }
            }
          }
      })
  }


  buyNow(product:any)
  {
    var details = {
    userName:this.userName,
    userId : this.userId,
    productId: product.productId,
    title: product.productTitle,
    itemsCount:product.productCount,
    subTitle: product.productSubTitle,
    price: product.productPrice,
    specifications:product.productSpecifications,
    description:product.productDescription,
    discountPercentage: product.discountPercentage,
    thumbnail: product.productThumbnail,
  }
    this.addTo.placeOrder(details)
  }

  received(product:any)
  {
    this.db.updateDeliveredStatus(product).subscribe(data=>
      {
        window.location.reload();
      })
  }

}
