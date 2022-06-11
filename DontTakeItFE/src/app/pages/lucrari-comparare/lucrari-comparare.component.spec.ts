import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LucrariComparareComponent } from './lucrari-comparare.component';

describe('LucrariComparareComponent', () => {
  let component: LucrariComparareComponent;
  let fixture: ComponentFixture<LucrariComparareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LucrariComparareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LucrariComparareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
