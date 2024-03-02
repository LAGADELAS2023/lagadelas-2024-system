import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratesemboyanComponent } from './generatesemboyan.component';

describe('GeneratesemboyanComponent', () => {
  let component: GeneratesemboyanComponent;
  let fixture: ComponentFixture<GeneratesemboyanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneratesemboyanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneratesemboyanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
