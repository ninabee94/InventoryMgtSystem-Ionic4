import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.page.html',
  styleUrls: ['./insert.page.scss'],
})
export class InsertPage implements OnInit {

  name : string = "" ;
  quantity : string = "" ;
  price : string ="" ;

  constructor( private api : ApiService ) { }

  save(){
    if( (this.name=="") || (this.quantity=="") || (this.price=="") ){
      this.api.presentToast("Please Fill All Values");
    }
    else{
      let data = { name:this.name, quantity:this.quantity, price:this.price, userid:this.api.user[0]._id }
      this.api.mongo(data,"insert").subscribe(res => { 
        if( res = "success" ){ 
           this.api.presentToast("New Item Added"); 
           this.api.getInventory(this.api.user[0]._id);
           this.name=""; this.quantity=""; this.price="";
        }
        else { 
          this.api.presentToast("Error"); 
        }
      }, error => { this.api.api_error(); } )
    }
  }

  ngOnInit() {
  }

}
