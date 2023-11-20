import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneAnimeComponent } from './one-anime.component';

describe('OneAnimeComponent', () => {
  let component: OneAnimeComponent;
  let fixture: ComponentFixture<OneAnimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OneAnimeComponent]
    });
    fixture = TestBed.createComponent(OneAnimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
