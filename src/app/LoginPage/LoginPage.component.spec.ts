/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoginPageComponent } from './LoginPage.component';
import { NavigationBarComponent } from '../NavigationBar/NavigationBar.component';
import { DbService } from '../db.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPageComponent , NavigationBarComponent],
      imports: [HttpClientModule, ReactiveFormsModule],
      providers: [DbService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Form is not Validated", () => {
    expect(component.myForm.valid).toBeFalsy();
  })

  it("Form is validated", () => {
    expect(component.myForm.controls['username'].valid).toBeFalsy();
    expect(component.myForm.controls['password'].valid).toBeFalsy();
  })

});
