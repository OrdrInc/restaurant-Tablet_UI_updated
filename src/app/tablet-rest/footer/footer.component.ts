import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Input() landscape;
  @Input() orderFlow;
  year;
  constructor() { }

  ngOnInit() {
    
      var date= new Date;
      this.year= date.getFullYear();
    
  }

}
