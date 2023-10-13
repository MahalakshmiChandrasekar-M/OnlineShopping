/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FragranceComponent } from './Fragrance.component';

describe('FragranceComponent', () => {
  let component: FragranceComponent;
  let fixture: ComponentFixture<FragranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FragranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FragranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
