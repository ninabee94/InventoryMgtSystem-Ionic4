import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController} from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email : string = "nabihahzahari@gmail.com";
  password : string = "nabihah";

  constructor( private router : Router,
               private api : ApiService,
               private loadctrl : LoadingController) { }

  register(){
    this.router.navigateByUrl("register");
  }

  login(){
    let data = { email:this.email, password:this.password }
    this.api.mongo(data,"login").subscribe(res => { 
      if (res == "" ){ this.api.presentToast("Username or Password Error"); }
      else{ 
        this.api.user = res;
        this.gohome(res[0]._id);
      }
    }, error => { this.api.api_error(); } )
  } 

  async gohome(userid:string){
    let loading = await this.loadctrl.create();
    await loading.present(); 
    await this.api.getInventory(userid);
    await loading.dismiss();
    this.api.presentToast("Login Successful"); 
    await this.router.navigateByUrl("home");
  }

  ngOnInit() {
  }

}
