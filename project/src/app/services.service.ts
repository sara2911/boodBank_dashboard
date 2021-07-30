import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  mood:any=true
  apearNav:any=false;

  constructor(public db:AngularFireDatabase) {
  }
getAllAdmin(){
   return this.db.database.ref('/Admin')
}
AddAdmin(){
  return this.db.list('/Admin')
}
getAllUser(){
  return this.db.database.ref('/Users')
}
getUserById(id:any){
  return this.db.database.ref('/Users').orderByKey().equalTo(id)
}
getAllPosts(){
  return   this.db.database.ref('/Posts')

  // this.db.list('/Posts')
}
AddPost(p:any){
   return this.db.list('/Posts').valueChanges().subscribe().add(p)
  
}
getUsersSametype(){
  return this.db.database.ref('/Users').orderByChild('blood_type')
}


getpostbykey(){
  return this.db.database.ref('/Posts').orderByChild('key')
}

}
