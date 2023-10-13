import { Component, OnInit } from '@angular/core';
import { FormBuilder ,FormGroup, Validators } from '@angular/forms';
import { DbService } from '../db.service';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
//import { LoggerService } from '../Logger.service';


@Component({
  selector: 'app-AddProducts',
  templateUrl: './AddProducts.component.html',
  styleUrls: ['./AddProducts.component.css']
})
export class AddProductsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private db: DbService, private router:Router, private logger:NGXLogger) { }

  addProduct!: FormGroup;
  choosenCategory:any;
  choosenStatus:boolean=false;
  isFormValid = false;

  ngOnInit() {
    this.addProduct=this.formBuilder.group(
      {
      title: ['', [Validators.required]],
      subTitle: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required,Validators.pattern(/^\d{5}$/)]],
      discountPercentage: ['', [Validators.required, Validators.pattern(/^\d{2}$/)]],
      stock: ['', [Validators.required, Validators.pattern(/^\d{2}$/)]],
      brand : ['', [Validators.required]],
      specifications : ['', [Validators.required]],
      //category: ['', [Validators.required]],
      //itemsCount: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      thumbnail: ['', [Validators.required]]
      });
    }

    value:any;
    index:any;

    chooseCategory(choosenOption:any)
    {
      this.choosenStatus=true;
      this.choosenCategory=choosenOption;
      this.logger.warn("choosen category = "+this.choosenCategory);
    }

    selectedFileName: string | undefined;
    onFileSelected(event: Event) {
      const inputElement = event.target as HTMLInputElement;
      if (inputElement.files && inputElement.files.length > 0) {
        const file = inputElement.files[0];
        this.selectedFileName = file.name;
      } else {
        this.selectedFileName = undefined;
      }
    }

    onAdd()
    {
      var details = {
        title:this.addProduct.value.title,
        subTitle:this.addProduct.value.subTitle,
        description:this.addProduct.value.description,
        price:this.addProduct.value.price,
        discountPercentage:this.addProduct.value.discountPercentage,
        stock:this.addProduct.value.stock,
        brand:this.addProduct.value.brand,
        specifications:this.addProduct.value.specifications,
        category:this.choosenCategory,
        itemsCount:1,
        id:this.choosenCategory+"Id-"+this.selectedFileName,
        thumbnail:"assets/"+this.choosenCategory+"/"+this.selectedFileName,
      }

      this.logger.info("thumbnail url = "+this.selectedFileName);
      if(this.choosenCategory=="Mobiles")
      {
        this.db.addMobiles(details).subscribe(data=>
          {
            alert("Product Added to Mobiles Category Successfully");
            window.location.reload();
          })
      }
      else if(this.choosenCategory=="Electronics")
      {
        this.db.addElectronics(details).subscribe(data=>
          {
            alert("Product Added to Electronics Category Successfully");
            window.location.reload();
          })
      }
      else if(this.choosenCategory=="SkinCare")
      {
        this.db.addSkinCare(details).subscribe(data=>
          {
            alert("Product Added to Electronics Category Successfully");
            window.location.reload();
          })
      }
      else if(this.choosenCategory=="MakeUp")
      {
        this.db.addMakeUp(details).subscribe(data=>
          {
            alert("Product Added to Electronics Category Successfully");
            window.location.reload();
          })
      }
      /*else if(this.choosenCategory=="PersonalCare")
      {
        this.db.addPersonalCare(details).subscribe(data=>
          {
            alert("Product Added to Electronics Category Successfully");
            window.location.reload();
          })
      }*/
      else if(this.choosenCategory=="Fragrance")
      {
        this.db.addFragrance(details).subscribe(data=>
          {
            alert("Product Added to Electronics Category Successfully");
            window.location.reload();
          })
      }
    }

    onCancel()
    {
      window.location.reload();
    }
  }

