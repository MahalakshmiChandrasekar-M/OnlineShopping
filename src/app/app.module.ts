import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Home/Home.component';
import { ContactUsComponent } from './ContactUs/ContactUs.component';
import { MobilesComponent } from './Mobiles/Mobiles.component';
import { ElectronicsComponent } from './Electronics/Electronics.component';
import { MakeUpComponent } from './MakeUp/MakeUp.component';
import { FragranceComponent } from './Fragrance/Fragrance.component';
import { SkinCareComponent } from './SkinCare/SkinCare.component';
import { HttpClientModule } from '@angular/common/http';
import { SingleProductDetailsComponent } from './SingleProductDetails/SingleProductDetails.component';
import { OffersComponent } from './Offers/Offers.component';
import { AboutUsComponent } from './AboutUs/AboutUs.component';
import { NavigationBarComponent } from './NavigationBar/NavigationBar.component';
import { CartComponent } from './Cart/Cart.component';
import { WishlistComponent } from './Wishlist/Wishlist.component';
import { ProfileInfoComponent } from './ProfileInfo/ProfileInfo.component';
import { PlaceOrdersComponent } from './PlaceOrders/PlaceOrders.component';
import { LoginPageComponent } from './LoginPage/LoginPage.component';
import { SignUpPageComponent } from './SignUpPage/SignUpPage.component';
import { HeaderComponent } from './Header/Header.component';
import { OrdersHistoryComponent } from './OrdersHistory/OrdersHistory.component';
import { EditProductsComponent } from './EditProducts/EditProducts.component';
import { AddProductsComponent } from './AddProducts/AddProducts.component';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
@NgModule({
  declarations: [
    AppComponent,
      HomeComponent,
      ContactUsComponent,
      MobilesComponent,
      ElectronicsComponent,
      MakeUpComponent,
      FragranceComponent,
      SkinCareComponent,
      SingleProductDetailsComponent,
      OffersComponent,
      AboutUsComponent,
      NavigationBarComponent,
      CartComponent,
      WishlistComponent,
      ProfileInfoComponent,
      PlaceOrdersComponent,
      LoginPageComponent,
      SignUpPageComponent,
      HeaderComponent,
      OrdersHistoryComponent,
      EditProductsComponent,
      AddProductsComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.INFO,
      serverLogLevel: NgxLoggerLevel.ERROR,
      serverLoggingUrl: "http://localhost:3000/logs",
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
