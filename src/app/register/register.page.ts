import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email : string = "";
  name : string = "";
  position: string = "";
  password : string = "";
  repassword : string = "";

  constructor( private router : Router,
               private api : ApiService ) { }

  back(){
    this.router.navigateByUrl("login");
  }

  register(){
    if( (this.email=="") || (this.name=="") || (this.position=="") || (this.password=="") || (this.repassword=="") ){
      this.api.presentToast("Please Fill All Values");
    }
    else if(this.password != this.repassword){ this.api.presentToast("Password Not Match"); }
    else{
      let data = { email:this.email, name:this.name, position:this.position, password:this.password }
      this.api.mongo(data,"register").subscribe(res => { 
        if( res=="success" ){  this.api.presentToast("Successful Registration");  this.back(); }
        else { this.api.presentToast(res); }
      }, error => { this.api.api_error(); } )
    }
  }

  ngOnInit() {
  }

}
