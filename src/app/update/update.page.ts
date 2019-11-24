import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  itemid : string ="";
  name : string ="";
  quantity : string ="";
  price : string ="";

  constructor( private api:ApiService ) { }

  fillvalue(){
    let items = this.api.item;
    for(let x=0; x<items.length; x++){
       if(items[x]._id==this.itemid){
         this.name = items[x].name;
         this.quantity = items[x].quantity;
         this.price = items[x].price;
         break;
       }
    }
  }

  save(){
    if( (this.itemid=="")||(this.name=="")||(this.quantity=="")||(this.price=="") ){
      this.api.presentToast("Error. Please check the values");
    }
    else{
      let data = { itemid:this.itemid, name:this.name, quantity:this.quantity, price:this.price }
      this.api.mongo(data,"update").subscribe( (res)=>{
         if(res=="success"){
           this.api.presentToast("Updated Successfully");
           this.api.getInventory(this.api.user[0]._id);
           this.itemid=""; this.name="";
           this.quantity=""; this.price="";
         }
      }, error => { this.api.api_error(); } )
    }
  }

  ngOnInit() {
  }

}
