import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAnimesComponent } from './all-animes.component';

describe('AllAnimesComponent', () => {
  let component: AllAnimesComponent;
  let fixture: ComponentFixture<AllAnimesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllAnimesComponent]
    });
    fixture = TestBed.createComponent(AllAnimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
