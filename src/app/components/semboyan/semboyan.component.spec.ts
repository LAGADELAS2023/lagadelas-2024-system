import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemboyanComponent } from './semboyan.component';

describe('SemboyanComponent', () => {
  let component: SemboyanComponent;
  let fixture: ComponentFixture<SemboyanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SemboyanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SemboyanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
