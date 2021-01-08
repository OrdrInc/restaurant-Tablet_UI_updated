import { Component, OnInit } from '@angular/core';
import { AppService } from './../../app.service';
declare var $: any;
@Component({
  selector: 'app-crubside',
  templateUrl: './crubside.component.html',
  styleUrls: ['./crubside.component.css']
})

export class CrubsideComponent implements OnInit {
id;
checkedInCars=0;
resturantName;
ticketId;
selectedrow;
displayData;
data=[
  {
    ticketId:'127',
    time:'9:25',
    name:'Smantha Susan Stevenson MBBS',
    phone:'(248)-767-7673',
    notes:'Black Hyundai Elantra ,Ending with #2222, Phone no (999)-000-9999, Hazard lights ON. ',
    isDone:true,
    border:''
  },
  {
    ticketId:'10',
    time:'9:22',
    name:'Aaron',
    phone:'(248)-767-7673',
    notes:'White Jeep Cherokee ',
    isDone:false,
    border:''
  }
]
  constructor(private service: AppService) { 
    var str = window.location.href;
        var res = str.split("crubside/");
        this.id = res[1];
        this.service.getInitalDetails(this.id).subscribe(
          data => {
              
              this.resturantName = data.name;
          
          error => {
            
              console.log(error);
          }
          });

  }
  getFirstName(name,type){
   if(type=='firstname'){
    let x=name.split(" ",1);
    return x;
   } 
   else{
   let x=name.split(" ",1);
   let y=name.substring(x[0].length);
   return y;
   }
  }
 changeticketId(row){
   this.selectedrow=row;
   this.ticketId=row.ticketId;
  $('#ticketIdPop').modal('show');
 }
 save($event){
   for(var i=0;i<this.displayData.length;i++){
     if(this.selectedrow.ticketId== this.displayData[i].ticketId){
       this.displayData[i].ticketId= $event;
     }
   }
   
 }
 calculateCars(){
   this.checkedInCars=0;
  for(var i=0;i<this.displayData.length;i++){
    if(this.displayData[i].isDone==false){
      this.checkedInCars=this.checkedInCars+1;
    }
   }
 }
 pushData(){
   var pusherData={
    ticketId: Math.floor((Math.random() * 100) + 1).toString(),
    time:'9:22',
    name:'Aplha',
    phone:'(248)-767-7673',
    notes:'Black Hyundai Elantra.',
    isDone:false,
    border:'red-border'
   }
   pusherData["timer"] = 10;
   console.log(pusherData);
   this.push(pusherData);
  
 }
 putAllUndoneAtBottom(data){
   var done=[];
   var undone=[];
   for(var i=0;i<data.length;i++){
     if(data[i].isDone==true){
      done.push(data[i]);
     }
     else if(data[i].isDone==false){ 
      undone.push(data[i]);
     }
   }
   var displayData=undone.concat(done);
   return displayData;
 }
 done(){
  this.displayData= this.putAllUndoneAtBottom(this.displayData);
 }
 push(data){
  this.displayData.push(data);
  this.displayData= this.putAllUndoneAtBottom(this.displayData);
  this.calculateCars();
  for (var k = 0; k < this.displayData.length; k++) {
    if (this.displayData[k].timer != 0) {
        this.startTimer(this.displayData[k])

    }
}
 }
 startTimer(data) {

  var refreshIntervalId = setInterval(() => {
      if (data.timer > 0) {
          data.timer--;
         }
      else if (data.timer == 0) {
          
          for (var z = 0; z < this.displayData.length; z++) {
              if (this.displayData[z] == data) {

                  this.displayData[z].border = '';

              }
          }
          clearInterval(refreshIntervalId);
      }
      else if (data.timer == -1) {
          clearInterval(refreshIntervalId);
      }
  }, 1000)


}
  ngOnInit() {
    this.displayData= this.putAllUndoneAtBottom(this.data);
    for(var i=0;i<this.displayData.length;i++){
     if(this.displayData[i].isDone==false){
       this.checkedInCars=this.checkedInCars+1;
     }
    }
  }

}
