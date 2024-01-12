import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandiComponent } from './sandi.component';

describe('SandiComponent', () => {
  let component: SandiComponent;
  let fixture: ComponentFixture<SandiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SandiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SandiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
