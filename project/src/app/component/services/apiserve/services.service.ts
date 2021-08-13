import { Injectable } from '@angular/core';
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/database';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  mood:any=true
  apearNav:any=false;
optionGovern:any;
optionDay:any;
filterday:any;
num_repo:any;
btn_deletrepo:any;
SetOptionGovern(g:any){
  this.optionGovern=g
}
getOptionGovern(){
  return this.optionGovern;
}
SetoptionDay(d:any){
  this.optionDay=d
}
getoptionDay(){
  return this.optionDay;
}

  constructor(public db:AngularFireDatabase) {
  }
getAllAdmin(){
   return this.db.database.ref('/Admin')
}
getreports(r:any){
  return this.db.database.ref('/Admin/Report')
  .orderByChild('userID').equalTo(r)
}
deleterepo(){
  return this.db.database.ref('/Admin/Report')

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
getusersInGovern(){
 return this.db.database.ref('/Users').orderByChild('government')
}
getpostInGovern(g:any){
 return this.db.database.ref('/Posts').orderByChild('government').equalTo(g)

}
 getPostbyDay(d:any){
 return this.db.database.ref('/Posts').orderByChild('postDate')


 }
deleteUser(id:any){
   return this.db.database.ref('/Users').child(id).remove()
}
addInblock(){
  return this.db.database.ref('blocked')
}
}
// government