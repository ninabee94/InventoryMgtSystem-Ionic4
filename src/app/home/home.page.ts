import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( private api : ApiService,
               private loadctrl : LoadingController ) {
  }

  delete(itemid:string){
    this.api.delete(itemid).subscribe( (res)=>{
      if (res=="success"){
        this.update();
      }
      else{ this.api.presentToast("error"); }
    }, error => { this.api.api_error(); } )
  }

  async update(){
    let loading = await this.loadctrl.create();
    await loading.present(); 
    await this.api.getInventory(this.api.user[0]._id);
    await loading.dismiss();
    await this.api.presentToast("Deleted Successfully");
  }

}
