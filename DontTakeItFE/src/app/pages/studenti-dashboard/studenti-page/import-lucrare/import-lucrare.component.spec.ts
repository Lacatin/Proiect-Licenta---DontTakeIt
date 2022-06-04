import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportLucrareComponent } from './import-lucrare.component';

describe('ImportLucrareComponent', () => {
  let component: ImportLucrareComponent;
  let fixture: ComponentFixture<ImportLucrareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportLucrareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportLucrareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
