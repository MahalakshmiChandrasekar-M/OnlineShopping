import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';

@Component({
  selector: 'app-Header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dbService:DbService) { }

  header:any;
  ngOnInit() {
    this.dbService.getHeader().subscribe(data=>{
      this.header=data;
    })
  }

}
