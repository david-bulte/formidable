import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormidableItemComponent } from './formidable-item.component';

describe('FormidableItemComponent', () => {
  let component: FormidableItemComponent;
  let fixture: ComponentFixture<FormidableItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormidableItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormidableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
