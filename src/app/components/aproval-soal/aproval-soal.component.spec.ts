import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprovalSoalComponent } from './aproval-soal.component';

describe('AprovalSoalComponent', () => {
  let component: AprovalSoalComponent;
  let fixture: ComponentFixture<AprovalSoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AprovalSoalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AprovalSoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
