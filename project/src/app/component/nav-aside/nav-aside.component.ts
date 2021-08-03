import { Router } from '@angular/router';
import { ServicesService } from 'src/app/component/services/apiserve/services.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-aside',
  templateUrl: './nav-aside.component.html',
  styleUrls: ['./nav-aside.component.css']
})

export class NavAsideComponent implements OnInit {
  blood:string[]=['A+','B+','O+','AB+','A-','B-','O-','AB-']
  optionselect:any;
  router: any;
  constructor( private mood :ServicesService,public _Router:Router) { }

  ngOnInit(): void {
    
  }
submitval(v:any){
  console.log(v);
if(this._Router.url!==`/Users/${v}`
  )
  {console.log(true)
      //  window.location.reload();

this._Router.navigateByUrl(`/Users/${v}`).then(()=>{
  window.location.reload();

}) ;
  }
}

  getmood(){
    return this.mood.mood;

  }

}
// routerLink='/Users/{{optionselect}}' >
// <i class="fas fa-search"