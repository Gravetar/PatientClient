import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AapointmentspageComponent } from './aapointmentspage.component';

describe('AapointmentspageComponent', () => {
  let component: AapointmentspageComponent;
  let fixture: ComponentFixture<AapointmentspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AapointmentspageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AapointmentspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
