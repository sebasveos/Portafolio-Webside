import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeDirectoryComponent } from './anime-directory.component';

describe('AnimeDirectoryComponent', () => {
  let component: AnimeDirectoryComponent;
  let fixture: ComponentFixture<AnimeDirectoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnimeDirectoryComponent]
    });
    fixture = TestBed.createComponent(AnimeDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
