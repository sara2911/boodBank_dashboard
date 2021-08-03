import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/component/services/apiserve/services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(  private serve :ServicesService) { }
  bg_mood:any
  count:any=0
  arr:any=[]
  ngOnInit(): void {
  this.blood.forEach((p)=>{
    this.serve.getUsersSametype().equalTo(p).once('value',(snap)=>{
      this.count=0;
      snap.forEach((childsnap)=>{
        this.count+=1
         this.arr[p]=this.count
//          console.log( this.arr[p])
// console.log(this.arr)
      })
    })
  })
}
  
 

  getmood(){
return this.serve.mood
}
blood:string[]=['A+','B+','O+','AB+','A-','B-','O-','AB-']
  

}

