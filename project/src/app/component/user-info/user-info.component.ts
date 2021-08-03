import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../services/apiserve/services.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  userId:any;
  userinfo:any;
  posts:any[]=[];
    constructor( ourActivated:ActivatedRoute , public ourserve:ServicesService) { 
      this.userId=ourActivated.snapshot.params.type;
  
      console.log(this.userId)
  
    }
  ngOnInit(): void {
    this.ourserve.getUserById(this.userId).once('value',(snapshot)=>{
console.log(snapshot.val)
      snapshot.forEach((childsnap)=>{
        console.log(childsnap.val());
        this.userinfo=childsnap.val();

})
    })


    this.ourserve.getAllPosts().orderByChild('userID').equalTo(this.userId)
.once('value', (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    var childData=childSnapshot.val();
    this.posts.push(childData);
})

})
  }
  

}
