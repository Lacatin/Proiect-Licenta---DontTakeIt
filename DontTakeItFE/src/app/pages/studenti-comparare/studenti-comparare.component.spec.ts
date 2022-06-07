import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentiComparareComponent } from './studenti-comparare.component';

describe('StudentiComparareComponent', () => {
  let component: StudentiComparareComponent;
  let fixture: ComponentFixture<StudentiComparareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentiComparareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentiComparareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
