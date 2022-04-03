import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStudentiComponent } from './dashboard-studenti.component';

describe('DashboardStudentiComponent', () => {
  let component: DashboardStudentiComponent;
  let fixture: ComponentFixture<DashboardStudentiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardStudentiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardStudentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
