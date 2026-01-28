import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksCarrouselComponent } from './works-carrousel.component';

describe('WorksCarrouselComponent', () => {
  let component: WorksCarrouselComponent;
  let fixture: ComponentFixture<WorksCarrouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorksCarrouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksCarrouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
