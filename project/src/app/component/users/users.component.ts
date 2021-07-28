// import { UserDetailsComponent } from './../user-details/user-details.component';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ServicesService } from 'src/app/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
users:any[]=[];
objuser:any;
@Output() outEvent=new EventEmitter(); 
  constructor(
    private ourService:ServicesService,
    public rout:Router) {

     }

  ngOnInit(): void {
    this.ourService.getAllUser().once('value', (snapshot) => {
            snapshot.forEach((childSnapshot) => {
              // var childKey = childSnapshot.key;
              // this.postKey.push(childKey)
              var childData=childSnapshot.val()
              this.users.push(childData)
        })
        
      })

    // @Output() const objEmitter= new EventEmitter();


  }

  // .once('value', (snapshot) => {
    //       snapshot.forEach((childSnapshot) => {
    //         // var childKey = childSnapshot.key;
    //         // this.postKey.push(childKey)
    //         var childData=childSnapshot.val()
    //         this.values.push(childData)
    //   })
      
    // })

  bgcolor(){
    return this.ourService.mood
  }
  sendobj(obj:any){
    this.outEvent.emit(obj);
    console.log(":jjjjjjjjjjj")
    console.log(obj)
    this.rout.navigate([`Users/${obj}`])

  }

}
