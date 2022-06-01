import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentiPageComponent } from './studenti-page.component';

describe('StudentiPageComponent', () => {
  let component: StudentiPageComponent;
  let fixture: ComponentFixture<StudentiPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentiPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentiPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
