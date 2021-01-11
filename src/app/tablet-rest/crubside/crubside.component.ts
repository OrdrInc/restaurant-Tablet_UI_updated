import { Component, OnInit ,ViewChild,ElementRef} from '@angular/core';
import { AppService } from './../../app.service';
import { Howl, Howler } from 'howler';

declare var $: any;
@Component({
  selector: 'app-crubside',
  templateUrl: './crubside.component.html',
  styleUrls: ['./crubside.component.css']
})

export class CrubsideComponent implements OnInit {
  @ViewChild('audioOption') audioPlayerRef: ElementRef;
id;
checkedInCars=0;
resturantName;
ticketId;
audio: any;
selectedrow;
displayData;
curbId;
data=[
 /* {
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
  }*/
]
  constructor(private service: AppService) { 
    var str = window.location.href;
        var res = str.split("crubside/");
        this.id = res[1];
        this.service.getrestInfo(this.id).subscribe(
          data => {
              
              this.resturantName = data[0].friendlyName;
              this.getAlldata(data[0].restId,data[0].storeDate)
          error => {
            
              console.log(error);
          }
          });

  }
  getAlldata(restId,storeDate){
    this.service.getOneDayRecord(restId,storeDate).subscribe(
      data => {
      console.log(data);
      this.data=data;
     this.displayData= this.putAllUndoneAtBottom(this.data);
     for(var i=0;i< this.displayData.length;i++){
       this.displayData[i]['border']='';
     }
     this.calculateCars();
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
   this.ticketId=row.OrderInfo.ticketId;
   this.curbId=row.CurbId
  $('#ticketIdPop').modal('show');
 }
 save($event){
  
    this.service.updateTicketId(this.curbId,$event).subscribe(
      data => {
       if(data.msg==true){
        for(var i=0;i<this.displayData.length;i++){
          if(this.selectedrow.CurbId== this.displayData[i].CurbId){
            this.displayData[i].OrderInfo.ticketId= $event;
          }
         }
       }
      });
   $('#ticketIdPop').modal('hide');
   
 }
 calculateCars(){
   this.checkedInCars=0;
  for(var i=0;i<this.displayData.length;i++){
    if(this.displayData[i].status==false){
      this.checkedInCars=this.checkedInCars+1;
    }
   }
 }
 playAudio() {
  
      this.audio = new Audio();
      this.audio.src = "../../../../assets/sounds/slow-spring-board.mp3";
      this.audio.load();
      this.audio.play();
  
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
     if(data[i].status==true){
      done.push(data[i]);
     }
     else if(data[i].status==false){ 
      undone.push(data[i]);
     }
   }
   var displayData=undone.concat(done);
   return displayData;
 }

 done(row,status){
   if(status=='done'){
     var value= true;
   }
   else {
     value=false;
   }
 this.service.tabletDoneUndoneTogle(row.CurbId,value).subscribe(
      data => {
        if(data.msg==true){
          for(var i=0;i<this.displayData.length;i++){
            if(this.displayData[i].CurbId==row.CurbId){
              this.displayData[i].status= !this.displayData[i].status;
            }
          } 
            this.displayData= this.putAllUndoneAtBottom(this.displayData);
            this.calculateCars();
        }
      });

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
this.playAudio()
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
formatPhone(x) {
  // console.log('format phone')
  const val = x.split('');
  // console.log(val)
  const displayNo = `(${val[2]}${val[3]}${val[4]}) ${val[5]}${val[6]}${val[7]}-${val[8]}${val[9]}${val[10]}${val[11]}`;
  return displayNo;
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
