import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  email : string = this.api.user[0].email;
  name : string = this.api.user[0].name;  
  position : string = this.api.user[0].position; 
  password : string = this.api.user[0].password;  
  repassword : string = this.api.user[0].password;  

  constructor(private api: ApiService ) { }
  
  update(){
    if( (this.email=="") || (this.name=="") || (this.position=="") || (this.password=="") || (this.repassword=="") ){
      this.api.presentToast("Please Fill All Values");
    }
    else if(this.password != this.repassword){ this.api.presentToast("Password Not Match"); }
    else if( (this.email==this.api.user[0].email) && (this.name==this.api.user[0].name) && 
             (this.position==this.api.user[0].position) && (this.password==this.api.user[0].password) && 
             (this.repassword==this.api.user[0].password) ){
      this.api.presentToast("No Changes");
    }
    else{
      let data = { userid:this.api.user[0]._id, email:this.email, name:this.name, position:this.position, password:this.password }
      this.api.mongo(data,"profile").subscribe(res => { 
        if( res!="" ){ 
           this.api.presentToast("Successfully Updated");  
           this.api.user=res;
        }
        else { this.api.presentToast(res); }
      }, error => { this.api.api_error(); } )
    }
  }

  reset(){
    this.email = this.api.user[0].email;
    this.name = this.api.user[0].name;  
    this.position = this.api.user[0].position; 
    this.password = this.api.user[0].password;  
    this.repassword = this.api.user[0].password;  
  }

  ngOnInit() {
  }

}
