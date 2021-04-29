import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestItemComponent } from './guest-item.component';

describe('GuestItemComponent', () => {
  let component: GuestItemComponent;
  let fixture: ComponentFixture<GuestItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
