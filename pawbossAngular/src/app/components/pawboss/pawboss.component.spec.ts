import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PawbossComponent } from './pawboss.component';

describe('PawbossComponent', () => {
  let component: PawbossComponent;
  let fixture: ComponentFixture<PawbossComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PawbossComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PawbossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
