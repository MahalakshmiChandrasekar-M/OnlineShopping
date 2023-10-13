import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { environment } from '../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DbService {

constructor(private http:HttpClient) {}

getMobiles(){
  return this.http.get(environment.Mobiles)
}
getSkinCare(){
  return this.http.get(environment.SkinCare)
}
getMakeUp(){
  return this.http.get(environment.SkinCare)
}
getElectronics(){
  return this.http.get(environment.Electronics)
}
getFragrance(){
  return this.http.get(environment.Fragrances)
}
addUser(details:any)
{
    return this.http.post(environment.User,details);
}
addCurrentUser(details:any)
{
  return this.http.post(environment.CurrentUser,details);
}

addMobiles(details:any)
{
  return this.http.post(environment.Mobiles,details);
}
addElectronics(details:any)
{
  return this.http.post(environment.Electronics,details);
}
addSkinCare(details:any)
{
  return this.http.post(environment.SkinCare,details);
}
addMakeUp(details:any)
{
  return this.http.post(environment.MakeUp,details);
}
addFragrance(details:any)
{
  return this.http.post(environment.Fragrances,details);
}
addToCart(details:any)
{
  return this.http.post(environment.Cart,details)
}
userId=localStorage.getItem("userId");
getCart()
{
  return this.http.get(environment.Cart+"?userId="+this.userId)
}
getWishlist()
{
  return this.http.get(environment.Wishlist+"?userId="+this.userId)
}
addToWishlist(details:any)
{
  return this.http.post(environment.Wishlist,details)
}
addToPlaceOrder(details:any)
{
  return this.http.post(environment.PlaceOrders,details)
}
addToYourOrder(details:any)
{
  return this.http.post(environment.YourOrders,details)
}
getPlaceOrder()
{
  return this.http.get(environment.PlaceOrders);
}
getUser()
{
  return this.http.get(environment.User);
}
getCurrentUser()
{
  return this.http.get(environment.CurrentUser);
}
deleteCurrentUser(details:any)
{
  return this.http.delete(environment.CurrentUser+"/"+details)
}
deteletWishlistProducts(details:any)
{
  return this.http.delete(environment.Wishlist+"/"+details.id)
}

deteletCartProducts(details:any)
{
  return this.http.delete(environment.Cart+"/"+details.id)
}

getHeader()
{
  return this.http.get(environment.Header);
}

deteletePlaceOrder(details:any)
{
  return this.http.delete(environment.PlaceOrders+"/"+details.id)
}

deteleteYourOrder(details:any)
{
  return this.http.delete(environment.YourOrders+"/"+details)
}

deleteFragrance(details:any)
{
  return this.http.delete(+environment.Fragrances+"/"+details)
}

deleteElectronics(details:any)
{
  return this.http.delete(environment.Electronics+"/"+details)
}

deleteMobiles(details:any)
{
  return this.http.delete(environment.Mobiles+"/"+details)
}

deleteMakeUp(details:any)
{
  return this.http.delete(environment.MakeUp+"/"+details)
}

deleteSkinCare(details:any)
{
  return this.http.delete(environment.SkinCare+"/"+details)
}


getYourOrder()
{
  return this.http.get(environment.YourOrders)
}

addToOrdersHistory(details:any)
{
  return this.http.post(environment.OrdersHistory,details)
}

getOrderHistory()
{
  return this.http.get(environment.OrdersHistory);
}

updateItemsCount(count:any,product:any)
{
const updateCount = {itemsCount: count}
return this.http.patch(environment.Cart+"/"+product.id,updateCount)
}

updateCancelledStatus(product:any)
{
  const status= {deliveryStatus:"Cancelled"}
  return this.http.patch(environment.YourOrders+"/"+product.id,status)
}

updateDeliveredStatus(product:any)
{
  const status= {deliveryStatus:"Delivered"}
  alert("Thanks for your Information.!")
  return this.http.patch(environment.YourOrders+"/"+product.id,status)
}

updateFragrance(updateDetails:any, products:any)
{
  alert("Details Updated Successfully.!")
  return this.http.patch(environment.Fragrances+"/"+products.id,updateDetails)
}

updateElectronics(updateDetails:any, products:any)
{
  alert("Details Updated Successfully.!")
  return this.http.patch(environment.Electronics+"/"+products.id,updateDetails)
}

updateMobiles(updateDetails:any, products:any)
{
  alert("Details Updated Successfully.!")
  return this.http.patch(environment.Mobiles+"/"+products.id,updateDetails)
}

updateSkinCare(updateDetails:any, products:any)
{
  alert("Details Updated Successfully.!")
  return this.http.patch(environment.SkinCare+"/"+products.id,updateDetails)
}

updateMakeUp(updateDetails:any, products:any)
{
  alert("Details Updated Successfully.!")
  return this.http.patch(environment.MakeUp+"/"+products.id,updateDetails)
}

onInit(){}
}
