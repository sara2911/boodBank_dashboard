import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../services/apiserve/services.service';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
type:any;
values:any[]=[];
  constructor( ourActivated:ActivatedRoute , public ourserve:ServicesService) { 
    this.type=ourActivated.snapshot.params.type;

    console.log(this.type)

  }

  ngOnInit(): void {
    
        this.ourserve.getAllUser().orderByChild('blood_type').equalTo(this.type).once('value',
    (snapshot)=>{
            snapshot.forEach((childSnapshot) => {
       let v= childSnapshot.val()
             this.values.push(v)
      console.log(this.values)
    })
  })
    //  window.location.reload();

}
    

  }

