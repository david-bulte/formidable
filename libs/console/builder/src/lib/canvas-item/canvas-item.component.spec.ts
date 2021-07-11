import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasItemComponent } from './canvas-item.component';

describe('FormidableItemComponent', () => {
  let component: CanvasItemComponent;
  let fixture: ComponentFixture<CanvasItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
