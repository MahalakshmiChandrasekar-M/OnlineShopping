import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';
import { AddToService } from '../AddTo.service';
import { LoginService } from '../Login.service';
//import { LoggerService } from '../Logger.service';
import { NGXLogger } from 'ngx-logger';
@Component({
  selector: 'app-Mobiles',
  templateUrl: './Mobiles.component.html',
  styleUrls: ['./Mobiles.component.css']
})
export class MobilesComponent implements OnInit {

  array:any="";
  details:any="";
  choosenBrand:any="";
  brandProducts:any=[];
  i=0;

  constructor(private db:DbService, private service:AddToService, private loginService :LoginService, private logger:NGXLogger) {
  }

  onClickLink(choice:any)
  {
    this.choosenBrand=choice;
    this.logger.info("choosen "+this.choosenBrand);
    if(this.choosenBrand.indexOf("Samsung")!==-1)
    {
      this.i=0;
      this.brandProducts = [];
      for(let data of this.array)
      {
        if(data.brand.indexOf("Samsung")!==-1)
        {
          this.brandProducts[this.i]=data;
          this.i++;
          this.logger.info("Samsung = "+this.brandProducts);
        }
      }
    }
    else if(this.choosenBrand.indexOf("Apple")!==-1)
    {
      this.i=0;
      this.brandProducts = [];
      for(let data of this.array)
      {
        if(data.brand.indexOf("Apple")!==-1)
        {
          this.brandProducts[this.i]=data;
          this.i++;
          this.logger.info("Apple = "+this.brandProducts);
        }
      }
    }
    else if(this.choosenBrand.indexOf("OnePlus")!==-1)
    {
      this.i=0;
      this.brandProducts = [];
      for(let data of this.array)
      {
        if(data.brand.indexOf("OnePlus")!==-1)
        {
          this.brandProducts[this.i]=data;
          this.i++;
          this.logger.info("OnePlus = "+this.brandProducts);
        }
      }
    }
    else if(this.choosenBrand.indexOf("RedMi")!==-1)
    {
      this.i=0;
      this.brandProducts = [];
      for(let data of this.array)
      {
        if(data.brand.indexOf("RedMi")!==-1)
        {
          this.brandProducts[this.i]=data;
          this.i++;
          this.logger.info("Redmi = "+this.brandProducts);
        }
      }
    }
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

  isSelected: boolean = false; // Variable to track the selection state
  ngOnInit() {

    this.db.getMobiles().subscribe(data=>{
      this.array=data;
      this.logger.info("Array = "+this.array);

      this.i=0;
      this.brandProducts = [];
      for(let item of this.array)
      {
          this.brandProducts[this.i]=item;
          this.i++;
          this.logger.info("All = "+this.brandProducts);
      }
  })
    }

    toggleSelection() {
      this.isSelected = !this.isSelected;
    }
}

