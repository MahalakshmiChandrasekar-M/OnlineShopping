import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { LoginService } from './Login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable ,interval, Subscription, map} from 'rxjs';
import { HttpClient } from '@angular/common/http';
//import { LoggerService } from './Logger.service';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class AddToService {



  constructor(private logger:NGXLogger, private db:DbService, private http: HttpClient,private loginService:LoginService,private router:Router) {
    this.startCountdown();
  }

  private apiUrl = 'assets/products.json'; // Path to your JSON file

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }


//deal countdown
dealDuration: number = 30;
countdownTimer$!: Observable<number>;
countdownSeconds!: number;
countdownSubscription!: Subscription;
isRunning:boolean=true;

//cancel coount down
cancellingDuration:number=15;
cancelCountdownTimer$!: Observable<number>;
cancellingCountDown!:number;
cancelCountdownSubscription!: Subscription;
isCancelRunning:boolean=true;

retLogin:any="Login";
retOrders:any="PlaceOrders"
wish:boolean=false;
cartStatus:boolean=false;
loginStatus:boolean=false;

//getting from local storage
userName = localStorage.getItem("username");
userId = localStorage.getItem("userId");

addToWishlist(product:any)
  {
    this.logger.info(product);
    this.loginStatus=this.loginService.isUserLoggedIn()
    if(this.loginStatus==true)
    {
    var details = {
      userName:this.userName,
      userId : this.userId,
      productId: product.id,
      title: product.title,
      subTitle: product.subTitle,
      price: product.price,
      specifications:product.specifications,
      description:product.description,
      discountPercentage: product.discountPercentage,
      thumbnail: product.thumbnail,
      itemsCount:product.itemsCount,
    }
    this.db.addToWishlist(details).subscribe(data=>
      {
        this.logger.log("Product Added to Wishlist Successfully");
        alert("Product Added to Wishlist Successfully");
      })
  }
  else
  {
    alert("please login to continue");
    this.router.navigate([this.retLogin]);
  }
  }

  deleteWishlist(product:any)
  {
    this.wish=!this.wish;
    console.log(product);
      this.db.deteletWishlistProducts(product).subscribe(data=>
        {
          window.location.reload();
          this.logger.info("Product Deleted from Wishlist");
        })
  }


  addToCart(product:any)
  {
    this.logger.log(product);
    this.loginStatus=this.loginService.isUserLoggedIn()
    if(this.loginStatus==true)
    {
        var details = {
          userName:this.userName,
          userId : this.userId,
          productId: product.id,
          title: product.title,
          subTitle: product.subTitle,
          price: product.price,
          specifications:product.specifications,
          description:product.description,
          discountPercentage: product.discountPercentage,
          thumbnail: product.thumbnail,
          itemsCount:product.itemsCount,
        }
        this.db.addToCart(details).subscribe(data=>
        {
          alert("Product Added to Cart Successfully");
        })
    }
    else
    {
      alert("please login to continue");
      this.router.navigate([this.retLogin]);
    }
  }

  addCartWishlist(product:any)
  {
    var details = {
      userName:this.userName,
      userId : this.userId,
      productId: product.productId,
      title: product.title,
      subTitle: product.subTitle,
      price: product.price,
      specifications:product.specifications,
      description:product.description,
      discountPercentage: product.discountPercentage,
      thumbnail: product.thumbnail,
      itemsCount:product.itemsCount,
    }
    this.db.addToCart(details).subscribe(data=>
    {
      alert("Product Added to Cart Successfully");
    })
  }

  deleteCart(product:any)
  {
    this.logger.info("deleted from cart");
      this.db.deteletCartProducts(product).subscribe(data=>
        {
          this.logger.log("Product Deleted from cart");
        })
  }

  placeOrder(product:any)
  {
      this.db.addToPlaceOrder(product).subscribe(data=>
      {
        this.router.navigate([this.retOrders]);
        this.logger.log("Product added to place order");
      })
  }

  startCountdown(): void {
    const endTime = new Date().getTime() + this.dealDuration * 1000;

    this.countdownTimer$ = interval(1000);
    this.countdownSubscription = this.countdownTimer$.subscribe(() => {
    const currentTime = new Date().getTime();
    const remainingTime = endTime - currentTime;


      if (remainingTime <= 0) {
        this.countdownSubscription.unsubscribe();
        this.isRunning = false;
        this.countdownSeconds = 0;
        return;
      }

      // Convert remaining time to seconds
      this.countdownSeconds = Math.floor((remainingTime / 1000) % 60);
    });
  }

  getDiscountPercentage(): number {
    return 10;
  }

  getCountdownSeconds(): number {
    return this.countdownSeconds;
  }

  getIsRunning(): boolean {
    return this.isRunning;
  }

  cancellingCountdown(): void {
    const endTime = new Date().getTime() + this.cancellingDuration * 1000;

    this.cancelCountdownTimer$= interval(1000);
    this.cancelCountdownSubscription = this.cancelCountdownTimer$.subscribe(() => {
      this.isCancelRunning = true;
      const currentTime = new Date().getTime();
      const remainingTime = endTime - currentTime;

      if (remainingTime <= 0) {
        this.isCancelRunning = false;
        this.cancelCountdownSubscription.unsubscribe();
        this.cancellingCountDown = 0;
        return;
      }

      // Convert remaining time to seconds
      this.cancellingCountDown = Math.floor((remainingTime / 1000) % 60);
    });
  }

  getCancelCountdown()
  {
    return this.cancellingCountDown;
  }

  getIsCancelRunning(): boolean {
    return this.isCancelRunning;
  }

  searchedProducts(products:any)
  {
    //this.router.navigate[("SearchedProducts")];
    console.log("searched products --->")
    this.logger.info(products);
    this.navigateProducts(products);
  }

  navigateProducts(products:any){
    return products;
  }

  optionsSelected:any="Default";
  optionChoosen(options:any)
  {
    this.optionsSelected=options;
    this.router.navigate(["OrdersHistory"]);
  }

  getOptions()
  {
    return this.optionsSelected;
  }
}
