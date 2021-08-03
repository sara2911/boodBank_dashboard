import { ServicesService } from '../services/apiserve/services.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  governments:any= [
    'Alexandera',
    'Cairo',
    'Beheira',
    'Beni Suief',
    'Dakahlia',
    'Damietta',
    'Faiyuim',
    'Al-minya',
    'Asyut',
    'Aswan'
  ];
  Days:any[]=[];
  day(){
    for(let i=1;i<31;i++){
  this.Days.push(i);
    }
  }
  constructor( public serve:ServicesService ) { }
// serve.optionGovern=optionG.value

  ngOnInit(): void {

    this.day();
  }
  getvalue(g:any,d:any){
    // this.serve.=g;
    console.log(d)
    // let arr:any[]=[]
    console.log(g)
    // this.serve.getpostInGovern(g).once('value',(snap)=>{
    //   snap.forEach((childsnap)=>{
    //    arr.push(childsnap.val())
    // })
  
    // }).then(()=>{
    //   this.posts=arr
    // })
  
    this.serve.getPostbyDay(g)
  }
  
  
}
