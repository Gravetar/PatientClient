import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutpatientcardComponent } from './outpatientcard.component';

describe('OutpatientcardComponent', () => {
  let component: OutpatientcardComponent;
  let fixture: ComponentFixture<OutpatientcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutpatientcardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutpatientcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
