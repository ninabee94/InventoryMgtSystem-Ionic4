import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController, LoadingController} from '@ionic/angular';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements CanActivate{

  user:any=[]; item:any=[];

  label:any=[]; bg1:any=[]; bg2:any=[]; data1:any=[]; data2:any=[]; 
  data3:any=[]; bg3:any=[]; bg4:any=[];  //for chart
  
  constructor(public http : Http, 
              private toastctrl : ToastController,
              private loadctrl : LoadingController,
              private router : Router) { }

  async presentToast(message:string){
    const toast = await this.toastctrl.create({ message:message, position: 'middle', duration: 2000 });
     toast.present();
  }   

  canActivate(): boolean {
    if(this.user!=""){ return true; }
    else{ this.router.navigateByUrl("login"); return false; }
  }

  api_error(){
    this.presentToast("Database Connection Error");
    this.logout();
  }

  async logout(){
    let loading = await this.loadctrl.create();
    await loading.present(); 
    await loading.dismiss();
    await this.presentToast("Logged Out Successfully");
    await this.router.navigateByUrl("login")
    .then( ()=>{ this.user=[];  this.item=[]; } );  
  }
  
  //backend api

  mongo( data:any, route:string){
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://192.168.43.67:8080/api/"+route, data , options)
    .map(res => res.json());
  } 

  delete( itemid:string){
    return this.http.delete("http://192.168.43.67:8080/api/delete/"+ itemid)
    .map(res => res.json());
  }

  getInventory(userid:string){
    this.label=[]; this.bg1=[]; this.bg2=[]; this.data1=[]; this.data2=[]; 
    this.data3=[]; this.bg3=[]; this.bg4=[];
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://192.168.43.67:8080/api/getinventory", {userid:userid} , options)
    .map(res => res.json() )
    .subscribe( (res)=>{ 
      this.item=res; 
      for(let x=0; x<res.length; x++){ 
        if(x==0){ this.new_data(x); }
        else{
          let y=0;
          for(; y<this.label.length; y++){ if(res[x].name==this.label[y]){ break; } }
          if(y==this.label.length){ this.new_data(x); }
        }          
      }
    }, error => { this.api_error(); } );
  }  

  //fuctions for charts

  new_data(x:number){
    this.label.push(this.item[x].name); 
    this.bg1.push("red"); 
    this.bg2.push("blue"); 
    this.data1.push(this.count_input(this.item[x].name)); 
    this.data2.push(this.count_total(this.item[x].name)); 
    this.data3.push(this.count_price(this.item[x].name));
    this.bg3.push(this.pick_color(x));
    this.bg4.push(this.pie_hover(x));
  }

  count_input(item_name:string){
    let input = 0;
    for(let z=0; z<this.item.length; z++){
      if( this.item[z].name==item_name ){ input++; }
    }
    return input;
  }  

  count_total(item_name:string){
    let total=0;
    for(let z=0; z<this.item.length; z++){
      if( this.item[z].name==item_name ){ total+=this.item[z].quantity; }
    }
    return total;
  }

  count_price(item_name:string){
    let price=0;
    for(let z=0; z<this.item.length; z++){
      if( this.item[z].name==item_name ){ price+=this.item[z].price; }
    }
    return price;
  }

  pick_color(index:number){
    if( (index%2==0) ){ return "blue"; }
    else { return "red"; }
  }

  pie_hover(index:number){
    if( this.bg3[index]=="red" ){ return "orange"; }
    else { return "yellow"; }
  }  

}
