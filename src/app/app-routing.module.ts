import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './AboutUs/AboutUs.component';
import { CartComponent } from './Cart/Cart.component';
import { ContactUsComponent } from './ContactUs/ContactUs.component';
import { ElectronicsComponent } from './Electronics/Electronics.component';
import { FragranceComponent } from './Fragrance/Fragrance.component';
import { HomeComponent } from './Home/Home.component';
import { MakeUpComponent } from './MakeUp/MakeUp.component';
import { MobilesComponent } from './Mobiles/Mobiles.component';
import { OffersComponent } from './Offers/Offers.component';
import { SingleProductDetailsComponent } from './SingleProductDetails/SingleProductDetails.component';
import { SkinCareComponent } from './SkinCare/SkinCare.component';
import { WishlistComponent } from './Wishlist/Wishlist.component';
import { ProfileInfoComponent } from './ProfileInfo/ProfileInfo.component';
import { PlaceOrdersComponent } from './PlaceOrders/PlaceOrders.component';
import { LoginPageComponent } from './LoginPage/LoginPage.component';
import { SignUpPageComponent } from './SignUpPage/SignUpPage.component';
//import { BrandDisplayComponent } from './BrandDisplay/BrandDisplay.component';
import { OrdersHistoryComponent } from './OrdersHistory/OrdersHistory.component';
import { EditProductsComponent } from './EditProducts/EditProducts.component';
import { AddProductsComponent } from './AddProducts/AddProducts.component';
import { AuthGuardGuard } from './auth-guard.guard';


const routes: Routes = [
  {
    path:"Home",
    component:HomeComponent,
  },
  {
    path:"Login",
    component:LoginPageComponent,
  },
  {
    path:"Login/:check",
    component:SingleProductDetailsComponent,
  },
  {
    path:"AddProducts",
    component:AddProductsComponent,
  },
  {
    path:"AddProducts/:check",
    component:SingleProductDetailsComponent,
  },
  {
    path:"ContactUs",
    component:ContactUsComponent,
  },
  {
    path:"ContactUs/:check",
    component:SingleProductDetailsComponent,
  },
  {
    path:"Fragrance/EditProducts/:check",
    component:EditProductsComponent,
  },
  {
    path:"Mobiles/EditProducts/:check",
    component:EditProductsComponent,
  },
  {
    path:"Electronics/EditProducts/:check",
    component:EditProductsComponent,
  },
  {
    path:"SkinCare/EditProducts/:check",
    component:EditProductsComponent,
  },
  {
    path:"MakeUp/EditProducts/:check",
    component:EditProductsComponent,
  },
  {
    path:"Cart",
    component:CartComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path:"Cart/:check",
    component:SingleProductDetailsComponent,
  },
  {
    path:"Wishlist",
    component:WishlistComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path:"Wishlist/:check",
    component:SingleProductDetailsComponent,
  },
  {
    path:"Mobiles",
    component:MobilesComponent,
  },
  {
    path:"Mobiles/:check/EditProducts/:check",
    component:EditProductsComponent,
  },
  {
    path:"Mobiles/:check",
    component:SingleProductDetailsComponent,
  },
  /*{
    path:"Mobiles/brand/:check/EditProducts/:check",
    component:EditProductsComponent,
  },
  {
    path:"Mobiles/brand/:check",
    component:BrandDisplayComponent,
  },*/
  {
    path:"Electronics",
    component:ElectronicsComponent,
  },
  {
    path:"Electronics/:check/EditProducts/:check",
    component:EditProductsComponent,
  },
  {
    path:"Electronics/:check",
    component:SingleProductDetailsComponent,
  },
  {
    path:"Appliances/:check",
    component:SingleProductDetailsComponent,
  },
  {
    path:"SkinCare",
    component:SkinCareComponent,
  },
  {
    path:"SkinCare/:check",
    component:SingleProductDetailsComponent,
  },
  {
    path:"MakeUp",
    component:MakeUpComponent,
  },
  {
    path:"MakeUp/:check",
    component:SingleProductDetailsComponent,
  },
  {
    path:"Fragrance",
    component:FragranceComponent,
  },
  {
    path:"Fragrance/:check",
    component:SingleProductDetailsComponent,
  },
  {
    path:"Home/:check",
    component:SingleProductDetailsComponent,
  },
  {
    path:"SignUp",
    component:SignUpPageComponent,
  },
  {
    path:"SignUp/:check",
    component:SingleProductDetailsComponent,
  },
  {
    path:"ProfileInfo",
    component:ProfileInfoComponent,
  },
  {
    path:"ProfileInfo/:check",
    component:SingleProductDetailsComponent,
  },
  {
    path:"Offers",
    component:OffersComponent,
  },
  {
    path:"Offers/:check",
    component:SingleProductDetailsComponent,
  },
  {
    path:"AboutUs",
    component:AboutUsComponent,
  },
  {
    path:"PlaceOrders",
    component:PlaceOrdersComponent,
  },
  {
    path:"PlaceOrders/:check",
    component:SingleProductDetailsComponent,
  },
  {
    path:"OrdersHistory",
    component:OrdersHistoryComponent,
  },
  {
    path:"OrdersHistory/:check",
    component:SingleProductDetailsComponent,
  },
  {
  path:"",
  component:HomeComponent,
  },
  {
  path:"*****",
  component:HomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
