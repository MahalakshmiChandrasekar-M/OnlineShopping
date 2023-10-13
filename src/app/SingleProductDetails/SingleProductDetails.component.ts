import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from '../db.service';
import { AddToService } from '../AddTo.service';
import { LoginService } from '../Login.service';

@Component({
  selector: 'app-SingleProductDetails',
  templateUrl: './SingleProductDetails.component.html',
  styleUrls: ['./SingleProductDetails.component.css']
})
export class SingleProductDetailsComponent implements OnInit {

  allProducts:any="";
  searchedFor:any="";
  //singleProduct:any=[];
  Products:any=[];
  link:any="";
  i=0;
  wishlistStatus:boolean=false;
  constructor(private service:DbService,private route:ActivatedRoute, private addTo:AddToService, private router:Router, private loginService:LoginService) { }

  isAdminUser:boolean=this.loginService.userType()

  addedToWishlist:boolean=false;
  loginStatus=this.loginService.isUserLoggedIn();



  buyNow(product:any)
  {
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
    this.addTo.placeOrder(details)
  }
  else
  {
    alert("Please Login to Buy Products.!");
  }
  }

  //getting from local storage
 userName = localStorage.getItem("username");
 userId = localStorage.getItem("userId");

 addCart(product:any)
 {
   this.addTo.addToCart(product)
 }

 addWishlist(product:any)
 {
  this.wishlistStatus=!this.wishlistStatus;
  this.addTo.addToWishlist(product)
 }

 removeFromWishlist(products:any){
  this.wishlistStatus=!this.wishlistStatus;
  this.addTo.deleteWishlist(products);
}

  ngOnInit()
  {
    this.route.params.subscribe(link=>{
      this.link=link['check'];
    })

    if(this.link.indexOf("MobilesId")!==-1)
    {
      this.service.getMobiles().subscribe(data=>
        {
          this.allProducts=data;
          this.route.params.subscribe(paramsData=>
            {
              this.searchedFor=paramsData['check'];

              for(let data of this.allProducts)
              {
                if(data.id==this.searchedFor)
                {
                  this.Products[this.i]=data;
                  break;
                }
              }
            })
        })
    }
    else if(this.link.indexOf("ElectronicsId")!==-1)
    {
      this.service.getElectronics().subscribe(data=>
        {
          this.allProducts=data;
          this.route.params.subscribe(paramsData=>
            {
              this.searchedFor=paramsData['check'];

              for(let data of this.allProducts)
              {
                if(data.id==this.searchedFor)
                {
                  this.Products[this.i]=data;
                  break;
                }
              }
            })
        })
    }
    else
    {
      this.router.navigate([this.link])
    }
  }

}
