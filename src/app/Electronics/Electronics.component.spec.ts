/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ElectronicsComponent } from './Electronics.component';
import { DbService } from '../db.service';
import { NavigationBarComponent } from '../NavigationBar/NavigationBar.component';
import { AddToService } from '../AddTo.service';
import { LoginService } from '../Login.service';

describe('ElectronicsComponent', () => {
  let component: ElectronicsComponent;
  let fixture: ComponentFixture<ElectronicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectronicsComponent ,NavigationBarComponent],
      imports: [HttpClientModule],
      providers: [DbService, AddToService, LoginService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectronicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("The Products retrieved from database Successfully",() => {
    expect(component.Products).not.toBeNull();
  })

  it("Admin Logged in",() => {
    expect(component.isAdminUser).toBeFalse();
  })

});
