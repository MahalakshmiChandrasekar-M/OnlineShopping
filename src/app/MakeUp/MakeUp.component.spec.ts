/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MakeUpComponent } from './MakeUp.component';

describe('MakeUpComponent', () => {
  let component: MakeUpComponent;
  let fixture: ComponentFixture<MakeUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
