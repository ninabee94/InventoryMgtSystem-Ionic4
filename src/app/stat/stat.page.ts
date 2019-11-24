import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { LoadingController} from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.page.html',
  styleUrls: ['./stat.page.scss'],
})
export class StatPage implements OnInit {

  item_stat : string = "selected";
  price_stat : string = "unselected";  

  myChart: Chart; pie: Chart
  @ViewChild('chartcanvas') chartcanvas: ElementRef;
  @ViewChild('piecanvas') piecanvas: ElementRef;

  constructor(private loadctrl : LoadingController,
              private api : ApiService) { }

  async change( stat:string ){
    let loading = await this.loadctrl.create();
    await loading.present(); 
    if(stat=="item"){ this.item_stat="selected"; this.price_stat="unselected"; this.createBar();}
    else{ this.item_stat="unselected"; this.price_stat="selected"; this.createpie(); }
    await loading.dismiss();
    
  }

  ngOnInit() {}

 ngAfterViewInit() { this.createBar(); }

  async createBar() { 
    let loading = await this.loadctrl.create();
    await loading.present();   
    this.myChart = new Chart(this.chartcanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.api.label,
        datasets: [
          { label:'# of input', data:this.api.data1, backgroundColor:this.api.bg1, borderWidth:1 },
          { label:'# of total', data: this.api.data2, backgroundColor: this.api.bg2, borderWidth:1 }
        ]
      },
      options:{  maintainAspectRatio:false, scales:{ yAxes:[{ticks:{beginAtZero:true}}] }  }
    });
    await loading.dismiss();
  }

 async createpie(){
    let loading = await this.loadctrl.create();
    await loading.present();   
    this.pie = new Chart(this.piecanvas.nativeElement, {
      type: "pie",
      data: {
        labels: this.api.label,
        datasets: [
          { label:"# of Prices", data:this.api.data3, backgroundColor:this.api.bg3, hoverBackgroundColor:this.api.bg4 }
        ]
      }
    });
    await loading.dismiss();
  }

}
