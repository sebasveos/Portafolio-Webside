import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCapituleComponent } from './view-capitule.component';

describe('ViewCapituleComponent', () => {
  let component: ViewCapituleComponent;
  let fixture: ComponentFixture<ViewCapituleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCapituleComponent]
    });
    fixture = TestBed.createComponent(ViewCapituleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
