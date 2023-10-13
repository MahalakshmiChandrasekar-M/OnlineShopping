import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';

@Component({
  selector: 'app-Offers',
  templateUrl: './Offers.component.html',
  styleUrls: ['./Offers.component.css']
})
export class OffersComponent implements OnInit {

  array:any="";
  constructor(private service:DbService) {
    this.service.getSkinCare().subscribe(data=>{
      this.array=data;
    })
  }

  ngOnInit() {
  }

}
