import { Component, OnInit } from '@angular/core';
import { AddToService } from '../AddTo.service';
import { DbService } from '../db.service';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private addTo:AddToService, private dbService:DbService) {}

  discountPercentage!: number;
  remainingTime!: number;
  isRunning!:boolean;
  allProducts:any;
  offerProduct:any=[];
  offer:any;
  i=0;


  ngOnInit(): void {

    this.dbService.getMobiles().subscribe(data=>
      {
        this.offer=0;
        this.allProducts=data;
        for(let products of this.allProducts)
        {
          if(products.discountPercentage>this.offer)
          {
            this.offer=products.discountPercentage;
            this.offerProduct[this.i]=products;
          }
        }
        this.i++;
      })

      this.dbService.getElectronics().subscribe(data=>
        {
          this.offer=0;
          this.allProducts=data;
          for(let products of this.allProducts)
          {
            if(products.discountPercentage>this.offer)
            {
              this.offer=products.discountPercentage;
              this.offerProduct[this.i]=products;
            }
          }
          this.i++;
        })

        this.dbService.getFragrance().subscribe(data=>
          {
            this.offer=0;
            this.allProducts=data;
            for(let products of this.allProducts)
            {
              if(products.discountPercentage>this.offer)
              {
                this.offer=products.discountPercentage;
                this.offerProduct[this.i]=products;
              }
            }
            this.i++;
          })

          this.dbService.getSkinCare().subscribe(data=>
            {
              this.offer=0;
              this.allProducts=data;
              for(let products of this.allProducts)
              {
                if(products.discountPercentage>this.offer)
                {
                  this.offer=products.discountPercentage;
                  this.offerProduct[this.i]=products;
                }
              }
              this.i++;
            })

            this.dbService.getMakeUp().subscribe(data=>
              {
                this.offer=0;
                this.allProducts=data;
                for(let products of this.allProducts)
                {
                  if(products.discountPercentage>this.offer)
                  {
                    this.offer=products.discountPercentage;
                    this.offerProduct[this.i]=products;
                  }
                }
                this.i++;
              })



    this.discountPercentage = this.addTo.getDiscountPercentage();

    // Update countdown every second
    var intervalId=setInterval(() => {
      this.remainingTime = this.addTo.getCountdownSeconds();
      this.isRunning = this.addTo.getIsRunning();
      if (this.remainingTime <= 0) {
        clearInterval(intervalId); // Terminate the interval
        this.isRunning=false;
      }
    }, 1000);
  }
}
