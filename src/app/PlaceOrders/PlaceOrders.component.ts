import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';
import { Router } from '@angular/router';
import { AddToService } from '../AddTo.service';
import { FormBuilder ,FormGroup, Validators } from '@angular/forms';
//import { LoggerService } from '../Logger.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-PlaceOrders',
  templateUrl: './PlaceOrders.component.html',
  styleUrls: ['./PlaceOrders.component.css']
})
export class PlaceOrdersComponent implements OnInit {

  constructor(private logger:NGXLogger, private db:DbService, private router:Router, private addTo:AddToService,private formBuilder: FormBuilder) {}

  paymentDetails!: FormGroup;
  cardDetails!: FormGroup;

  //myForm!: FormGroup;
  paymentOption:string='';
  productInfo:any=[];
  price:any;
  count:any;
  totalPrice:any;
  grandTotal:any;
  retCart="Cart";
  singleProduct:any;

  //Timed Offer
  offerPrice=0;
  offerGrandTotal=0;
  discountPercentage!: number;
  remainingTime!: number;
  isRunning!:boolean;

  //Cancelling Timer
  cancellingCountDown!:number;
  isCancelTimeRunning:boolean=true;
  cancelStatus:any="Yes";

  //status to view the cancel page
  status:boolean=true;

  cancelPlaceOrder(product:any)
  {
    this.db.deteletePlaceOrder(product).subscribe(data=>
      {
        this.router.navigate([this.retCart])
      })
  }

    ngOnInit()
    {
      this.paymentDetails=this.formBuilder.group(
        {
        address: ['', [Validators.required]],
        pincode: ['', [Validators.required,Validators.pattern(/^\d{6}$/)]],
        phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        });

        this.cardDetails=this.formBuilder.group(
          {
            name: ['', [Validators.required]],
            cardNumber: ['', [Validators.required,Validators.pattern(/^\d{16}$/)]],
            expiryDate: ['', [Validators.required]],
            cvv: ['', [Validators.required,Validators.pattern(/^\d{3}$/)]],
          });

    //count
    this.discountPercentage = this.addTo.getDiscountPercentage();

    // Update countdown every second
      const intervalId = setInterval(() => {
      this.remainingTime = this.addTo.getCountdownSeconds();
      this.isRunning = this.addTo.getIsRunning();
      this.discountPercentage = this.addTo.getDiscountPercentage();

      if (this.remainingTime <= 0) {
        clearInterval(intervalId); // Terminate the interval
        this.isRunning=false;
      }
    }, 1000);

    this.db.getPlaceOrder().subscribe(data=>
      {
        this.productInfo=data;

        for(let products of this.productInfo)
        {
          this.price=products.price;
          this.count=products.itemsCount;
        }

        this.totalPrice=this.price*this.count;
        this.offerPrice=(this.totalPrice/100)*this.discountPercentage;
        this.offerGrandTotal=this.totalPrice-this.offerPrice+50;
        this.grandTotal=this.totalPrice+50;
      })
  }

  cancelIntervalId:any;
  cancelCounts()
  {
    this.addTo.cancellingCountdown();
    this.cancelIntervalId = setInterval(() => {
      this.cancellingCountDown = this.addTo.getCancelCountdown();
      this.isCancelTimeRunning = this.addTo.getIsCancelRunning();
      this.logger.log(" Cancel count down = "+this.isCancelTimeRunning);
      this.logger.log(" Cancel count down = "+this.cancellingCountDown);

      if (this.cancellingCountDown <= -1) {
        clearInterval(this.cancelIntervalId); // Terminate the interval
      }
    }, 1000);

  }


  yourOrders:any;
  cancelOrderYes(product:any)
  {
    alert("Your order  is canceled successfully.")
    clearInterval(this.cancelIntervalId);
    this.logger.info("cancel count down stopped")
      this.db.getYourOrder().subscribe(data=>
        {
          this.yourOrders=data;
          for(let items of this.yourOrders)
          {
            console
            if(items.productId.indexOf(product.productId)!==-1 && items.userId==this.userId)
            {
              this.singleProduct=items;
              break;
            }
          }
          this.db.updateCancelledStatus(this.singleProduct).subscribe(data=>
            {
              this.logger.info("Cancelled status updated");
            })

          this.db.deteletePlaceOrder(product).subscribe(data=>
        {
          this.logger.info("Order canceled & Deleted product from PlaceOrder")
          this.router.navigate([this.retCart])
        })
      })
  }

  cancelOrderNo(product:any)
  {
    alert("Your Order Placed Successfully")
    clearInterval(this.cancelIntervalId);
    console.log("cancel count down stopped")
      this.db.deteletePlaceOrder(product).subscribe(data=>
        {
          this.logger.info("Deleted product from PlaceOrder")
          this.router.navigate([this.retCart])
        })
      }

  maxItemsCount(product:any)
  {
    this.count = ++this.count;
    this.db.updateItemsCount(this.count,product).subscribe(data=>
      {
        this.logger.info("count updated = "+this.count);
      })
      //window.location.reload();
        this.totalPrice=this.price*this.count;
        this.offerPrice=(this.totalPrice/100)*this.discountPercentage;
        this.offerGrandTotal=this.totalPrice-this.offerPrice+50;
        this.grandTotal=this.totalPrice+50;
  }
  minItemsCount(product:any)
  {
    if(this.count>1)
    {
      --this.count ;
      this.db.updateItemsCount(this.count ,product).subscribe(data=>
      {
        console.log("count updated = "+this.count );
      })

        this.totalPrice=this.price*this.count;
        this.offerPrice=(this.totalPrice/100)*this.discountPercentage;
        this.offerGrandTotal=this.totalPrice-this.offerPrice+50;
        this.grandTotal=this.totalPrice+50;
    }
    else
    {
      alert("Only One Product left. You cannot reduce count anymore.!")
    }
  }


  //getting from local storage
 userName = localStorage.getItem("username");
 userId = localStorage.getItem("userId");
  confirmOrder(products:any)
  {
    var orderDetails={
      userName:this.userName,
      userId : this.userId,
      productId:products.productId,
      productTitle:products.title,
      productSubTitle:products.subTitle,
      productThumbnail:products.thumbnail,
      productPrice:products.price,
      productSpecifications:products.specifications,
      productDescription:products.description,
      productCount:this.count,
      offerTotalAmount:this.offerGrandTotal,
      grandTotalAmount:this.grandTotal,
      address:this.paymentDetails.value.address,
      pinCode:this.paymentDetails.value.pincode,
      phoneNumber:this.paymentDetails.value.phoneNumber,
      paymentOption:this.paymentOption,
      cardHolderName:this.paymentDetails.value.name,
      cardNumber:this.paymentDetails.value.cardNumber,
      deliveryStatus:"InProcess",
    }

    console.log(orderDetails);
    this.db.addToYourOrder(orderDetails).subscribe(data=>
      {
        alert("Order Confirmed")
        this.status=false;
        this.cancelCounts();
      })
  }
}
