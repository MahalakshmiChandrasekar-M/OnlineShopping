import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
//import { LoggerService } from '../Logger.service';
@Component({
  selector: 'app-EditProducts',
  templateUrl: './EditProducts.component.html',
  styleUrls: ['./EditProducts.component.css']
})
export class EditProductsComponent implements OnInit {

  constructor(private service:DbService,private route:ActivatedRoute, private router:Router, private logger:NGXLogger) { }


  allProducts:any="";
  searchedFor:any="";
  //singleProduct:any=[];
  Products:any=[];
  i=0;
  link:any;
  retPage:any;
  ngOnInit()
  {
    this.route.params.subscribe(link=>{
      this.link=link['check'];
    })

    if(this.link.indexOf("MobilesId")!==-1)
    {
      this.retPage="Mobiles";
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
                  this.assignValues(this.Products);
                  break;
                }
              }
            })
        })
    }
    else if(this.link.indexOf("ElectronicsId")!==-1)
    {
      this.retPage="Electronics";
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
                  this.assignValues(this.Products);
                  break;
                }
              }
            })
          })
    }
    else if(this.link.indexOf("SkinCareId")!==-1)
    {
      this.retPage="SkinCare";
      this.service.getSkinCare().subscribe(data=>
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
                  this.assignValues(this.Products);
                  break;
                }
              }
            })
          })
    }
    else if(this.link.indexOf("MakeUpId")!==-1)
    {
      this.retPage="MakeUp";
      this.service.getMakeUp().subscribe(data=>
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
                  this.assignValues(this.Products);
                  break;
                }
              }
            })
          })
      }
    else if(this.link.indexOf("FragrencesId")!==-1)
    {
      this.retPage="Fragrance";
      this.service.getFragrance().subscribe(data=>
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
                  this.assignValues(this.Products);
                  break;
                }
              }
            })
          })
      }
    }

    //fields to edit
    title:any;
    subTitle:any;
    specifications:any;
    description:any;
    price:any;
    offerPercentage:any;

    assignValues(product:any)
    {
      for(let item of product)
      {
        this.title=item.title;
        this.subTitle=item.subTitle;
        this.specifications=item.specifications;
        this.description=item.description;
        this.price=item.price;
        this.offerPercentage=item.discountPercentage;
      }
    }


      updateData(products:any)
      {
        var updateDetails = {
          title: this.title,
          subTitle: this.subTitle,
          description : this.description,
          price: this.price,
          discountPercentage: this.offerPercentage,
          specifications: this.specifications,
        }

        if(this.retPage=="Fragrance")
        {
          this.service.updateFragrance(updateDetails,products).subscribe({})
        }
        else if(this.retPage=="Electronics")
        {
          this.service.updateElectronics(updateDetails,products).subscribe({})
        }
        else if(this.retPage=="MakeUp")
        {
          this.service.updateMakeUp(updateDetails,products).subscribe({})
        }
        else if(this.retPage=="Mobiles")
        {
          this.service.updateMobiles(updateDetails,products).subscribe({})
        }
        else if(this.retPage=="SkinCare")
        {
          this.service.updateSkinCare(updateDetails,products).subscribe({})
        }
        this.router.navigate([this.retPage])
      }

      cancelUpdate()
      {
        this.router.navigate([this.retPage])
      }

      deleteProduct(products:any)
      {
        if(this.retPage=="Fragrance")
        {
          this.service.deleteFragrance(products.id).subscribe({})
          this.logger.info("Product deleted");
        }
        else if(this.retPage=="Electronics")
        {
          this.service.deleteElectronics(products.id).subscribe({})
          this.logger.info("Product deleted");
        }
        else if(this.retPage=="MakeUp")
        {
          this.service.deleteMakeUp(products.id).subscribe({})
          this.logger.info("Product deleted");
        }
        else if(this.retPage=="Mobiles")
        {
          this.service.deleteMobiles(products.id).subscribe({})
          this.logger.info("Product deleted");
        }
        else if(this.retPage=="SkinCare")
        {
          this.service.deleteSkinCare(products.id).subscribe({})
          this.logger.info("Product deleted");
        }
        this.router.navigate([this.retPage])
      }
}

