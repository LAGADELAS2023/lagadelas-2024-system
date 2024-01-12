import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratesandiComponent } from './generatesandi.component';

describe('GeneratesandiComponent', () => {
  let component: GeneratesandiComponent;
  let fixture: ComponentFixture<GeneratesandiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneratesandiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneratesandiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
