import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlBaseComponent } from './control-base.component';

describe('ControlBaseComponent', () => {
  let component: ControlBaseComponent;
  let fixture: ComponentFixture<ControlBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
