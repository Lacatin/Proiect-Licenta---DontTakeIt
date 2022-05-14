import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentiDashboardComponent } from './studenti-dashboard.component';

describe('StudentiDashboardComponent', () => {
  let component: StudentiDashboardComponent;
  let fixture: ComponentFixture<StudentiDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentiDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentiDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
